import axios from 'axios';
import { ZHAZHA_TOKEN } from '../redux/constants';

export const request = axios.create();

const authToken = window.sessionStorage.getItem(ZHAZHA_TOKEN) || window.localStorage.getItem('zhazha_token') || '';

request.interceptors.request.use((config) => {
  const authInfo = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return Object.assign(config, authInfo);
}, err => Promise.reject(err));

export default request;
