const HTTPReqParamError = require('../errors/http_request_param_error');
const ErrorCode = require('../errors/error_code');

/**
 * verifyPassword 密码校验，错误则抛错
 * @param password String 密码
 * */
function verifyPassword(password) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
  const result = password.match(reg);
  if (!result) {
    throw new HTTPReqParamError(
      '密码必须是 8 到 16 位大小写字母加数字组合',
      'password content error, not match the rule',
      'password',
      ErrorCode.PasswordError,
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
      ErrorCode.EmailError,
    );
  }
}

module.exports = {
  verifyPassword,
  verifyEmail,
};