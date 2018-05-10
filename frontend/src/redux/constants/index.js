// upload state
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';

// host target
export const LEANCLOUD = 'LEANCLOUD';
export const QINIU = 'QINIU';
export const ALIYUN = 'ALIYUN';

// common status
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

// user state
export const USER_UPDATE = 'USER_UPDATE'; // 更新
export const USER_DELETE = 'USER_DELETE'; // 注销
export const USER_SIGNUP = 'USER_SIGNUP'; // 注册
export const USER_LOGIN = 'USER_LOGIN'; // 登录

// validate email, pwd, confirmPwd, securityCode
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_PWD = 'VALIDATE_PWD';
export const VALIDATE_CONFIRM_PWD = 'VALIDATE_CONFIRM_PWD';
export const VALIDATE_SECURITY_CODE = 'VALIDATE_SECURITY_CODE';
export const VALIDATE_CHECKBOX = 'VALIDATE_CHECKBOX';
export const SECURITY_CODE_LEN = 6;
export const PWD_MAX_LEN = 16;
export const PWD_MIN_LEN = 8;

// localStorage
export const ZHAZHA_USER = 'ZHAZHA_USER';
export const ZHAZHA_TOKEN = 'ZHAZHA_TOKEN';
