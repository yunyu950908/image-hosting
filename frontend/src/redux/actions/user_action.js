import { USER_UPDATE, USER_DELETE, USER_SIGNUP, USER_LOGIN } from '../constants';

const cpJSON = obj => JSON.parse(JSON.stringify(obj));

export const updateUserInfo = (data) => {
  return ({
    type: USER_UPDATE,
    payload: {
      userInfo: data,
    },
  });
};

export const deleteUserInfo = () => ({
  type: USER_DELETE,
  payload: {
    email: '',
  },
});

export const userSignup = (data) => {
  const cpData = cpJSON(data);
  const { token } = cpData;
  delete cpData.token;
  return ({
    type: USER_SIGNUP,
    payload: {
      userInfo: cpData,
      token,
    },
  });
};

export const userLogin = (data) => {
  const cpData = cpJSON(data);
  const { token, rememberMe } = cpData;
  delete cpData.token;
  delete cpData.rememberMe;
  return ({
    type: USER_LOGIN,
    payload: {
      userInfo: cpData,
      token,
      rememberMe,
    },
  });
};
