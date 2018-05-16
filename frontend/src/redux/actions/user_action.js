import { message } from 'antd';

import {
  USER_UPDATE,
  USER_DELETE,
  USER_LOGIN,
  USER_LOGOUT,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILED,
  MESSAGE_ID,
} from '../constants';
import * as API from '../../request';

export const userLogin = data => ({
  type: USER_LOGIN,
  payload: {
    ...data,
  },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: {},
});

export const userUpdate = () => ({
  type: USER_UPDATE,
  payload: {},
});

export const userDelete = () => ({
  type: USER_DELETE,
  payload: {},
});

// async action
function userSignup(signupInfo) {
  return async function fetchUserSignup(dispatch) {
    try {
      const { data } = await API.fetchSignup(signupInfo);
      const { code, msg } = data;
      if (code !== 0) {
        message.error(msg);
        dispatch({
          type: '',
          payload: {},
        });
      } else {
        message.success('注册成功！');
        await new Promise(rsv => window.setTimeout(rsv, 1000));
        dispatch({
          type: FETCH_SIGNUP_SUCCESS,
          payload: data.data,
        });
      }
    } catch (e) {
      console.error(e);
      message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      dispatch({
        type: FETCH_SIGNUP_FAILED,
        payload: {},
      });
    }
  };
}

export const fetchUserSignup = (validateState, target) => {
  let lock = true;
  const { validateInput, userInput } = validateState;
  // 确保邮箱，密码，邮箱验证码，送信id，同意注册协议都为真
  const isPwdAllTrue = Object.values(validateInput.pwd).every(v => v) && Object.values(validateInput.confirmPwd).every(v => v);
  const messageId = userInput.messageId || window.sessionStorage.getItem(MESSAGE_ID);
  if (!validateInput.email) {
    message.error('email 地址错误，请检查后重试！');
  } else if (!isPwdAllTrue) {
    message.error('密码格式有误，请检查后重试！');
  } else if (!messageId) {
    message.error('请重新获取新的邮件验证码！');
  } else if (!validateInput.securityCode) {
    message.error('邮件验证码格式错误！');
  } else {
    lock = false;
  }
  if (lock) return { type: '', payload: {} };
  const prepareSignupInfo = {
    email: userInput.email,
    password: userInput.pwd,
    securityCode: userInput.securityCode,
    messageId: userInput.messageId,
  };
  return target === 'signup' ? userSignup(prepareSignupInfo) : '';
};
