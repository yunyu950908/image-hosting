const ERROR_CODE = {
  LoginError: 30, // 注册登录发生其他问题
  NoSuchUser: 3001, // 用户不存在
  UserAlreadyExist: 3002, // 注册用户已存在
  PasswordError: 3003, // 密码错误
  HTTPReqParamError: 40, // http 请求错误默认码
  RequiredParamEmptyError: 4001, // 必填参数为空
  ParamTypeError: 4002, // 参数类型错误
  InvalidEmail: 4005, // 邮箱格式错误
  InvalidPassword: 40006, // 密码格式错误
  NoAuthError: 41, // no auth
  ResourceNotFoundError: 44, // resource not found
  InternalServerError: 50, // internal server error
  SystemError: 5001, // 系统错误
};

module.exports = ERROR_CODE;