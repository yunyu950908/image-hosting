const InternalServerError = require('../errors/internal_server_error');
const HTTPReqParamError = require('../errors/http_request_param_error');
const LoginError = require('../errors/login_error');
const ErrorCode = require('../errors/error_code');
const UserModel = require('../models/user');
const JWTService = require('./jwt_service');

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

/**
 * addNewUser 注册创建新用户
 * @param userInfo email 注册邮箱
 * @param userInfo password 注册密码
 * */
async function addNewUser(userInfo) {
  const { email, password } = userInfo;
  verifyEmail(email);
  verifyPassword(password);
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
  const result = await UserModel.findUserByEmailAndPwd({ email, password }, { _id: 1, email: 1 });
  if (!result) throw new LoginError('密码错误', `password error ${email}`, ErrorCode.PasswordError);
  const token = JWTService.setJWT(result._id);
  return {
    email,
    token,
  };
}

module.exports = {
  addNewUser,
  userLogin,
};