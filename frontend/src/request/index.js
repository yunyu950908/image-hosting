import axios from 'axios';

const request = axios.create();

const authToken = window.localStorage.getItem('zhazha_token') || '';

request.interceptors.request.use((config) => {
  const authInfo = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return Object.assign(config, authInfo);
}, err => Promise.reject(err));

export default request;
