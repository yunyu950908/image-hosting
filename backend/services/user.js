const InternalServerError = require('../errors/internal_server_error');
const HTTPReqParamError = require('../errors/http_request_param_error');
const LoginError = require('../errors/login_error');
const ErrorCode = require('../errors/error_code');
const UserModel = require('../models/user');
const JWTService = require('./jwt_service');
const RedisService = require('./redis_service');
const MailService = require('./mail_service');
const CommonService = require('./common_service');

// pbkdf2
const pbkdf2Async = require('bluebird').promisify(require('crypto').pbkdf2);
const PasswordConfig = require('../config/cipher/password_config');

const { SALT, ITERATIONS, KEYLEN, DIGEST } = PasswordConfig;
const encryptWithPbkdf2 = password => pbkdf2Async(password, SALT, ITERATIONS, KEYLEN, DIGEST);

/**
 * verifyPassword 密码校验，错误则抛错
 * @param password String 密码
 * */
function verifyPassword(password) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9A-Z]+$)(?![0-9a-z]+$)[0-9A-Za-z]{8,16}$/;
  const result = password.match(reg);
  if (!result) {
    throw new HTTPReqParamError(
      '密码必须是 8 到 16 位大小写字母加数字组合',
      'password content error, not match the rule',
      'password',
      ErrorCode.InvalidPassword,
    );
  }
}

function verifyEmail(email) {
  const reg = /^[a-zA-Z0-9_-]+@[a-z0-9-]+[.][a-z\u4e00-\u9fa5]{2,4}$/;
  const result = email.match(reg);
  if (!result) {
    throw new HTTPReqParamError(
      '请输入正确的 email 地址',
      `email address error, ${email}`,
      'email',
      ErrorCode.InvalidEmail,
    );
  }
}

async function verifySecurityCode(email, messageId, securityCode) {
  const key = `${email}${messageId}`;
  const result = await RedisService.get(key);
  if (!result || result !== securityCode) {
    throw new HTTPReqParamError(
      '邮件验证码错误或已失效',
      `mail security code error, key: ${key}, code: ${securityCode}`,
      'securityCode',
      ErrorCode.InvalidSecurityCode,
    );
  }
}

/**
 * sendSecurityCode 发送邮件验证码
 * @param email String
 * @return { messageId }
 * */
async function sendSecurityCode(email) {
  const mailResult = await MailService.sendMail(email);
  const { securityCode, accepted, messageId } = mailResult;
  const key = `${accepted}${messageId}`;
  await RedisService.set(key, securityCode, 'Ex', 5 * 60);
  return { messageId };
}

/**
 * addNewUser 注册创建新用户
 * @param userInfo email 注册邮箱
 * @param userInfo password 注册密码
 * @return { email, token }
 * */
async function addNewUser(userInfo) {
  const { email, password, securityCode, messageId } = userInfo;
  if (!(email && password && securityCode && messageId)) throw CommonService.requiredEmptyError('email, password, securityCode, messageId');
  verifyEmail(email);
  verifyPassword(password);
  await verifySecurityCode(email, messageId, securityCode);
  const isExist = await UserModel.findUserByEmail(email);
  if (isExist) throw new HTTPReqParamError('该邮箱用户已存在', `duplicate key email: ${email} already exist`, 'email', ErrorCode.UserAlreadyExist);
  const encryptPwd = encryptWithPbkdf2(password);
  const result = await UserModel.createUserByEmailAndPwd({ email, password: encryptPwd });
  if (!result) throw new InternalServerError('db error');
  await RedisService.del(`${email}${messageId}`);
  const token = JWTService.setJWT(result._id);
  const defaultSettings = await UserModel.findUserByEmail(email);
  return {
    email,
    hostSetting: defaultSettings.hostSetting,
    token,
  };
}

/**
 * userLogin 用户登录
 * @param userInfo email 注册邮箱
 * @param userInfo password 注册密码
 * @return { email, token, hostSetting }
 * */
async function userLogin(userInfo) {
  const { email, password } = userInfo;
  verifyEmail(email);
  verifyPassword(password);
  const isExist = await UserModel.findUserByEmail(email);
  if (!isExist) throw new LoginError('账户不存在', `no such user ${email}`, ErrorCode.NoSuchUser);
  const encryptPwd = await encryptWithPbkdf2(password);
  const result = await UserModel.findUserByEmailAndPwd({ email, password: encryptPwd }, {
    _id: 1,
    email: 1,
    hostSetting: 1,
  });
  if (!result) throw new LoginError('密码错误', `password error ${email}`, ErrorCode.PasswordError);
  const token = JWTService.setJWT(result._id);
  return {
    email,
    hostSetting: result.hostSetting,
    token,
  };
}


/**
 * userUpdateEmail 更换邮箱
 * @param _id String required
 * @param userInfo email String required
 * @param userInfo newEmail String required
 * @param userInfo securityCode String required
 * @param userInfo messageId String required
 * @return { email }
 * */
async function userUpdateEmail(_id, userInfo) {
  const { email, newEmail, securityCode, messageId } = userInfo;
  if (!(email && newEmail && securityCode && messageId)) throw CommonService.requiredEmptyError('email, newEmail, securityCode, messageId');
  if (email === newEmail) throw new HTTPReqParamError('新旧邮箱不能相同', 'email and newEmail cannot be the same', 'newEmail');
  verifyEmail(newEmail);
  await verifySecurityCode(newEmail, messageId, securityCode);
  const result = await UserModel.findUserAndUpdate({ _id, email }, { email: newEmail });
  await RedisService.del(`${email}${messageId}`);
  return result;
}

/**
 * userUpdatePwd 更换密码
 * @param _id String required
 * @param userInfo email String required
 * @param userInfo oldPwd String required
 * @param userInfo newPwd String required
 * @param userInfo securityCode String required
 * @param userInfo messageId String required
 * @return { email }
 * */
async function userUpdatePwd(_id, userInfo) {
  const { email, oldPwd, newPwd, securityCode, messageId } = userInfo;
  if (!(email && oldPwd && newPwd && securityCode && messageId)) throw CommonService.requiredEmptyError('email, oldPwd, newPwd, securityCode, messageId');
  if (oldPwd === newPwd) throw new HTTPReqParamError('新旧密码不能相同', 'oldPwd and newPwd cannot be the same', 'newPwd');
  verifyPassword(newPwd);
  await verifySecurityCode(email, messageId, securityCode);
  const encryptOldPwd = await encryptWithPbkdf2(oldPwd);
  const encryptNewPwd = await encryptWithPbkdf2(newPwd);
  const result = await UserModel.findUserAndUpdate({
    email,
    _id,
    password: encryptOldPwd,
  }, { password: encryptNewPwd });
  if (!result) throw new LoginError('原密码错误', 'oldPwd error');
  await RedisService.del(`${email}${messageId}`);
  return result;
}

/**
 * handleForgetPwd 忘记密码
 * @param userInfo email、newPwd、securityCode、messageId
 * @return { email }
 * */
async function handleForgetPwd(userInfo) {
  const { email, password, securityCode, messageId } = userInfo;
  if (!(email && password && securityCode && messageId)) throw CommonService.requiredEmptyError('email, password, securityCode, messageId');
  verifyPassword(password);
  await verifySecurityCode(email, messageId, securityCode);
  const encryptNewPwd = await encryptWithPbkdf2(password);
  const result = await UserModel.findUserAndUpdate({
    email,
  }, { password: encryptNewPwd });
  if (!result) throw new LoginError('账户不存在', 'no such email', ErrorCode.NoSuchUser);
  await RedisService.del(`${email}${messageId}`);
  return result;
}

module.exports = {
  addNewUser,
  userLogin,
  sendSecurityCode,
  userUpdateEmail,
  userUpdatePwd,
  handleForgetPwd,
};
