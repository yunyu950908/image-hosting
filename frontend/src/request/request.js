import axios from 'axios';
import { ZHAZHA_TOKEN, ZHAZHA_USER } from '../redux/constants';

export const request = axios.create();

const authToken = window.sessionStorage.getItem(ZHAZHA_TOKEN) || window.localStorage.getItem(ZHAZHA_TOKEN) || '';
const userInfo = JSON.parse(window.sessionStorage.getItem(ZHAZHA_USER)) || JSON.parse(window.localStorage.getItem(ZHAZHA_USER)) || '';
request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${authToken}`;
  config.data.email = userInfo.email;
  return config;
}, err => Promise.reject(err));

export default request;
