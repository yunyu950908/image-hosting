import axios from 'axios';
import { request } from './request';
import * as API from './apis';

/**
 * 注册
 * @param userInfo email String
 * @param userInfo password String
 * @param userInfo securityCode String
 * @return Promise axios response
 * */
async function fetchSignup(userInfo) {
  const result = await axios({
    method: 'post',
    url: API.USER_SIGNUP,
    data: userInfo,
  });
  return result;
}

/**
 * 登录
 * @param userInfo email String
 * @param userInfo password String
 * @return Promise axios response
 * */
async function fetchLogin(userInfo) {
  const result = await axios({
    method: 'post',
    url: API.USER_LOGIN,
    data: userInfo,
  });
  return result;
}

/**
 * 获取邮件验证码
 * @param userInfo email String
 * @return Promise axios response
 * */
async function fetchMail(userInfo) {
  const result = await axios({
    method: 'post',
    url: API.USER_MAIL,
    data: userInfo,
  });
  return result;
}

async function fetchForget(userInfo) {
  const result = await axios({
    method: 'post',
    url: API.USER_FORGET,
    data: userInfo,
  });
  return result;
}

async function fetchStore(providerName, providerConfig) {
  const result = await request({
    method: 'post',
    url: API.USER_STORE,
    data: {
      action: 'set',
      providerName,
      providerConfig,
    },
  });
  return result;
}

export {
  fetchSignup,
  fetchLogin,
  fetchMail,
  fetchForget,
  fetchStore,
};
