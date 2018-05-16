import { message } from 'antd';

import {
  USER_DELETE,
  USER_LOGOUT,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILED,
  MESSAGE_ID,
  FETCH_FORGET_SUCCESS,
  FETCH_FORGET_FAILED,
  REMEMBER_ME,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILED,
  UPDATE_HOST_SETTING,
} from '../constants';
import * as API from '../../request';

const sleep = async (ms) => {
  const result = await new Promise(rsv => window.setTimeout(rsv, ms));
  return result;
};

/**
 * userSignup 用户注册/忘记密码重设
 * @param userInfo email String
 * @param userInfo password String
 * @param userInfo securityCode String
 * @param userInfo messageId String
 * @param target String
 * @return async function(dispatch){}
 * */
function userSignup(userInfo, target) {
  const successType = target === 'signup' ? FETCH_SIGNUP_SUCCESS : FETCH_FORGET_SUCCESS;
  const failedType = target === 'signup' ? FETCH_SIGNUP_FAILED : FETCH_FORGET_FAILED;
  const tips = target === 'signup' ? '注册成功！' : '修改成功！请重新登录...';
  const api = target === 'signup' ? API.fetchSignup : API.fetchForget;
  return async function fetchUserSignup(dispatch) {
    try {
      const { data } = await api(userInfo);
      const { code, msg } = data;
      if (code !== 0) {
        message.error(msg);
        dispatch({
          type: failedType,
          payload: {},
        });
      } else {
        message.success(tips);
        await sleep(500);
        dispatch({
          type: successType,
          payload: data.data,
        });
      }
    } catch (e) {
      console.error(e);
      message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      dispatch({
        type: failedType,
        payload: {},
      });
    }
  };
}

/**
 * userLogin 用户登录
 * @param loginInfo email String
 * @param loginInfo password String
 * @return async function(dispatch){}
 * */
function userLogin(loginInfo) {
  return async function fetchUserLogin(dispatch) {
    try {
      const { data } = await API.fetchLogin(loginInfo);
      const { code, msg } = data;
      if (code !== 0) return message.error(msg);
      message.success('登录成功！正在前往存储设置...');
      await sleep(500);
      // 提交 action
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        payload: {
          ...data.data,
          [REMEMBER_ME]: loginInfo[REMEMBER_ME],
        },
      });
      window.location.replace('/setting');
    } catch (e) {
      console.error(e);
      message.error('服务器开小差了... 请稍后再试，或尝试联系管理员...');
      dispatch({
        type: FETCH_LOGIN_FAILED,
        payload: {},
      });
    }
    return null;
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
  return userSignup(prepareSignupInfo, target);
};

export const fetchUserLogin = (validateState, isRemember) => {
  let lock = true;
  const { validateInput, userInput } = validateState;
  // 确保邮箱，密码
  const isPwdAllTrue = Object.values(validateInput.pwd).every(v => v);
  if (!validateInput.email) {
    message.error('email 地址错误，请检查后重试！');
  } else if (!isPwdAllTrue) {
    message.error('密码格式有误，请检查后重试！');
  } else {
    lock = false;
  }
  if (lock) return { type: '', payload: {} };
  const prepareLoginInfo = {
    email: userInput.email,
    password: userInput.pwd,
    [REMEMBER_ME]: isRemember,
  };
  return userLogin(prepareLoginInfo);
};


export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: {},
});

export const updateHostSetting = hostSetting => ({
  type: UPDATE_HOST_SETTING,
  payload: { hostSetting },
});

export const userDelete = () => ({
  type: USER_DELETE,
  payload: {},
});
