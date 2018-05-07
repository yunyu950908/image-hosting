const ErrorCode = require('../errors/error_code');
const HTTPReqParamError = require('../errors/http_request_param_error');

/**
 * requiredEmptyError 必填字段为空
 * @param param String 为空的字段名
 * */
const requiredEmptyError = param => new HTTPReqParamError(
  `必填参数 ${param} 不能为空`,
  `required field [ ${param} ] is empty`,
  param,
  ErrorCode.RequiredParamEmptyError,
);

/**
 * paramTypeError 参数类型错误
 * @param param String 参数名
 * @param currentType String 当前类型
 * @param expectType String 期望类型
 * */
const paramTypeError = (param, currentType, expectType) => new HTTPReqParamError(
  `${param} 类型错误，期望 ${expectType} 类型，得到 ${currentType} 类型`,
  `param type error, need ${expectType}, but got ${currentType}`,
  param,
  ErrorCode.ParamTypeError,
);


/**
 * ParamTypes 参数可用类型 统一以 Object.prototype.toString 为准
 * getType Func 获取目标参数类型
 * */
const ParamTypes = {
  getType: param => Object.prototype.toString.call(param).slice(8, -1),
  stringType: 'String',
  numberType: 'Number',
  arrayType: 'Array]',
  objectType: 'Object',
};

module.exports = {
  requiredEmptyError,
  paramTypeError,
  ParamTypes,
};
