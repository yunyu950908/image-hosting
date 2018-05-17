import {
  VALIDATE_EMAIL,
  VALIDATE_PWD,
  VALIDATE_CONFIRM_PWD,
  VALIDATE_SECURITY_CODE,
  CLEAR_VALIDATE_STATE,
} from '../constants';

export const validateEmail = (email) => ({
  type: VALIDATE_EMAIL,
  payload: {
    email,
  },
});

export const validatePwd = (pwd, isConfirm) => ({
  type: isConfirm ? VALIDATE_CONFIRM_PWD : VALIDATE_PWD,
  payload: {
    [isConfirm ? 'confirmPwd' : 'pwd']: pwd,
  },
});

export const validateSecurityCode = (code, isMsgId = false) => ({
  type: VALIDATE_SECURITY_CODE,
  payload: {
    [isMsgId ? 'messageId' : 'securityCode']: code,
  },
});

export const clearValidateState = () => ({
  type: CLEAR_VALIDATE_STATE,
  payload: {},
});
