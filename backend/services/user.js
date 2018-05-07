const InternalServerError = require('../errors/internal_server_error');
const HTTPReqParamError = require('../errors/http_request_param_error');
const LoginError = require('../errors/login_error');
const ErrorCode = require('../errors/error_code');
const UserModel = require('../models/user');
const JWTService = require('./jwt_service');
const RedisService = require('./redis_service');
const MailService = require('./mail_service');

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

async function verifySecurityCode(key, code) {
  const result = await RedisService.get(key);
  if (!result || result !== code) {
    throw new HTTPReqParamError(
      '邮件验证码错误',
      `mail security code error, key: ${key}, code: ${code}`,
      'securityCode',
      ErrorCode.InvalidSecurityCode,
    );
  }
}

/**
 * sendSecurityCode 发送邮件验证码
 * @param email String
 * */
async function sendSecurityCode(email) {
  const mailResult = await MailService.sendMail(email);
  const { securityCode, accepted, messageId } = mailResult;
  const key = `${accepted}${messageId}`;
  await RedisService.set(key, securityCode);
  return { messageId };
}

/**
 * addNewUser 注册创建新用户
 * @param userInfo email 注册邮箱
 * @param userInfo password 注册密码
 * */
async function addNewUser(userInfo) {
  const { email, password, securityCode, messageId } = userInfo;
  verifyEmail(email);
  verifyPassword(password);
  await verifySecurityCode(`${email}${messageId}`, securityCode);
  const isExist = await UserModel.findUserByEmail(email);
  if (isExist) throw new HTTPReqParamError('该邮箱用户已存在', `duplicate key email: ${email} already exist`, 'email', ErrorCode.UserAlreadyExist);
  const result = await UserModel.createUserByEmailAndPwd({ email, password });
  if (!result) throw new InternalServerError('db error');
  const token = JWTService.setJWT(result._id);
  return {
    email,
    token,
  };
}

/**
 * userLogin 用户登录
 * @param userInfo email 注册邮箱
 * @param userInfo password 注册密码
 * */
async function userLogin(userInfo) {
  const { email, password } = userInfo;
  verifyEmail(email);
  verifyPassword(password);
  const isExist = await UserModel.findUserByEmail(email);
  if (!isExist) throw new LoginError('账户不存在', `no such user ${email}`, ErrorCode.NoSuchUser);
  const result = await UserModel.findUserByEmailAndPwd({ email, password }, { _id: 1, email: 1, hostSetting: 1 });
  if (!result) throw new LoginError('密码错误', `password error ${email}`, ErrorCode.PasswordError);
  const token = JWTService.setJWT(result._id);
  return {
    email,
    hostSetting: result.hostSetting,
    token,
  };
}

/**
 * todo findUserAndUpdate 更新用户信息，暂时先这样吧... 很多东西不太熟，之后再研究
 * */
async function findUserAndUpdate(userInfo, updateInfo, updateField) {
  let updateData = {};
  switch (updateField) {
    case 'email': // 更新成功后要求重新登录
      updateData = { email: updateInfo.email };
      break;
    case 'password': // 更新成功后要求重新登录
      try {
        const password = await encryptWithPbkdf2(updateInfo.password);
        updateData = { password };
      } catch (e) {
        throw new Error('pbkdf2 加密错误');
      }
      break;
    case 'hostSetting':
      try {
        updateData = {
          hostSetting: {
            leancloud: {
              config: {
                APP_ID: updateInfo.hostSetting.leancloud.config.APP_ID,
                APP_KEY: updateInfo.hostSetting.leancloud.config.APP_KEY,
              },
            },
          },
        };
      } catch (e) {
        throw new HTTPReqParamError('更新字段内容错误', 'update field error', 'hostSetting', ErrorCode.ParamTypeError);
      }
      break;
    case 'getHostSetting':
      updateData = {};
      break;
    default:
      throw new HTTPReqParamError('需指定更新字段名，或字段名错误', 'need update field', 'updateField', ErrorCode.RequiredParamEmptyError);
  }
  const result = await UserModel.findUserAndUpdate(userInfo, updateData);
  if (!result) {
    throw new LoginError(
      '账户不存在或授权信息错误，请注册或重新登录',
      `no such user，or invalid auth info ${userInfo.email}`,
      ErrorCode.NoSuchUser,
    );
  }
  return result;
}

module.exports = {
  findUserAndUpdate,
  addNewUser,
  userLogin,
  sendSecurityCode,
};
