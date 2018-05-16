// upload state
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';

// request
export const FETCH_SIGNUP_SUCCESS = 'FETCH_SIGNUP_SUCCESS';
export const FETCH_SIGNUP_FAILED = 'FETCH_SIGNUP_FAILED';

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
export const USER_LOGIN = 'USER_LOGIN'; // 登录
export const USER_LOGOUT = 'USER_LOGOUT'; // 登出
export const REMEMBER_ME = 'REMEMBER_ME';

// validate email, pwd, confirmPwd, securityCode
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_PWD = 'VALIDATE_PWD';
export const VALIDATE_CONFIRM_PWD = 'VALIDATE_CONFIRM_PWD';
export const VALIDATE_SECURITY_CODE = 'VALIDATE_SECURITY_CODE';
export const SECURITY_CODE_LEN = 6;
export const PWD_MAX_LEN = 16;
export const PWD_MIN_LEN = 8;
export const MESSAGE_ID = 'MESSAGE_ID';

// localStorage
export const ZHAZHA_USER = 'ZHAZHA_USER';
export const ZHAZHA_TOKEN = 'ZHAZHA_TOKEN';
