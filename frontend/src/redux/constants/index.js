// upload state
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';

// request
// 注册
export const FETCH_SIGNUP_SUCCESS = 'FETCH_SIGNUP_SUCCESS';
export const FETCH_SIGNUP_FAILED = 'FETCH_SIGNUP_FAILED';
// 忘记密码
export const FETCH_FORGET_SUCCESS = 'FETCH_FORGET_SUCCESS';
export const FETCH_FORGET_FAILED = 'FETCH_FORGET_FAILED';
// 登录
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILED = 'FETCH_LOGIN_FAILED';

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
export const USER_LOGOUT = 'USER_LOGOUT'; // 登出
export const UPDATE_HOST_SETTING = 'UPDATE_HOST_SETTING'; // 更新hostSetting
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
export const CLEAR_VALIDATE_STATE = 'CLEAR_VALIDATE_STATE';

// localStorage
export const ZHAZHA_USER = 'ZHAZHA_USER';
export const ZHAZHA_TOKEN = 'ZHAZHA_TOKEN';
