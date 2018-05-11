import { USER_UPDATE, USER_DELETE, USER_SIGNUP, USER_LOGIN, USER_LOGOUT } from '../constants';

export const userSignup = data => ({
  type: USER_SIGNUP,
  payload: {
    ...data,
  },
});

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
