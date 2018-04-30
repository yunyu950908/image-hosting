const ERROR_CODE = {
  HTTPReqParamError: 40, // http 请求错误默认码
  RequiredParamEmptyError: 4001, // 必填参数为空
  ParamTypeError: 4002, // 参数类型错误
  UserAlreadyExist: 4003, // 注册用户已存在
  UserNotFound: 4004, // 用户不存在
  EmailError: 4005, // 邮箱错误
  PasswordError: 40006, // 密码错误
  _41: 41, // no auth
  ResourceNotFoundError: 44, // resource not found
  InternalServerError: 50, // internal server error
};

module.exports = ERROR_CODE;