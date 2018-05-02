import axios from 'axios';

async function fetchSignUp(userInfo) {
  const result = await axios({
    method: 'post',
    url: 'http://localhost:4000/user/signup',
    data: userInfo,
  });
  return result;
}

async function fetchLogin(userInfo) {
  const result = await axios({
    method: 'post',
    url: 'http://localhost:4000/user/login',
    data: userInfo,
  });
  return result;
}

export {
  fetchSignUp,
  fetchLogin,
};
