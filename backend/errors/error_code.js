const ERROR_CODE = {
  /**
   * 30
   * */
  LoginError: 30, // 注册登录发生其他问题
  NoSuchUser: 3001, // 用户不存在
  UserAlreadyExist: 3002, // 注册用户已存在
  PasswordError: 3003, // 密码错误
  /**
   * 40
   * */
  HTTPReqParamError: 40, // http 请求错误默认码
  RequiredParamEmptyError: 4001, // 必填参数为空
  ParamTypeError: 4002, // 参数类型错误
  InvalidEmail: 4005, // 邮箱格式错误
  InvalidPassword: 4006, // 密码格式错误
  InvalidSecurityCode: 4007, // 邮件验证码错误
  /**
   * 41
   * */
  NoAuthError: 41, // no auth
  ResourceNotFoundError: 44, // resource not found
  /**
   * 50
   * */
  InternalServerError: 50, // internal server error
  SystemError: 5001, // 系统错误
};

module.exports = ERROR_CODE;