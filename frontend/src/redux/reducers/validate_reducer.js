import {
  VALIDATE_EMAIL,
  VALIDATE_PWD,
  VALIDATE_CONFIRM_PWD,
  VALIDATE_SECURITY_CODE,
  SECURITY_CODE_LEN,
  PWD_MAX_LEN,
  PWD_MIN_LEN,
  MESSAGE_ID,
  CLEAR_VALIDATE_STATE,
} from '../constants';

const initialState = {
  userInput: {
    email: '',
    pwd: '',
    confirmPwd: '',
    securityCode: '',
    messageId: '',
  },
  validateInput: {
    email: false,
    pwd: {
      hasEnoughChars: false,
      hasNum: false,
      hasLowercase: false,
      hasUppercase: false,
    },
    confirmPwd: {
      hasEnoughChars: false,
      hasNum: false,
      hasLowercase: false,
      hasUppercase: false,
      isSame: false,
    },
    securityCode: false,
  },
};

const validatePwd = (pwd) => {
  const regHasNum = /\d/;
  const regHasLowercase = /[a-z]/;
  const regHasUppercase = /[A-Z]/;
  const hasEnoughChars = pwd.length >= PWD_MIN_LEN && pwd.length <= PWD_MAX_LEN;
  return {
    hasNum: !!pwd.match(regHasNum),
    hasLowercase: !!pwd.match(regHasLowercase),
    hasUppercase: !!pwd.match(regHasUppercase),
    hasEnoughChars,
  };
};

const cp = state => JSON.parse(JSON.stringify(state));

export const validateState = (state = initialState, action = {}) => {
  const { type, payload } = action;
  const newState = cp(state);
  switch (type) {
    // 邮箱格式
    case VALIDATE_EMAIL: {
      const { email } = payload;
      const reg = /^[a-zA-Z0-9_-]+@[a-z0-9-]+[.][a-z\u4e00-\u9fa5]{2,4}$/;
      newState.userInput.email = email;
      newState.validateInput.email = !!email.match(reg);
    }
      break;
    // 密码格式
    case VALIDATE_PWD: {
      const { pwd } = payload;
      newState.userInput.pwd = pwd;
      newState.validateInput.pwd = validatePwd(pwd);
    }
      break;
    // 确认密码
    case VALIDATE_CONFIRM_PWD: {
      const { confirmPwd } = payload;
      newState.userInput.confirmPwd = confirmPwd;
      newState.validateInput.confirmPwd = validatePwd(confirmPwd);
      const { pwd } = newState.userInput;
      newState.validateInput.confirmPwd.isSame = confirmPwd === pwd;
    }
      break;
    // 邮箱验证码
    case VALIDATE_SECURITY_CODE: {
      const { messageId, securityCode } = payload;
      if (messageId) {
        newState.userInput.messageId = messageId;
        window.sessionStorage.setItem(MESSAGE_ID, messageId);
      }
      if (securityCode) {
        newState.userInput.securityCode = securityCode;
        newState.validateInput.securityCode = securityCode.length === SECURITY_CODE_LEN;
      }
    }
      break;
    case CLEAR_VALIDATE_STATE:
      Object.assign(newState, initialState);
      break;
    default:
  }
  return newState;
};

export default validateState;
