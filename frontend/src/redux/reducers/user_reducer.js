import {
  USER_UPDATE,
  USER_DELETE,
  USER_SIGNUP,
  USER_LOGIN,
  // FETCH_USER_INFO_SUCCESS,
  // FETCH_USER_INFO_ERROR,
  ZHAZHA_TOKEN,
  ZHAZHA_USER,
} from '../constants';

const initialState = {
  email: window.sessionStorage.getItem(ZHAZHA_USER) || window.localStorage.getItem(ZHAZHA_USER) || '',
};

const initialAction = {
  type: '',
  payload: {},
};

const setLocalStorage = (payload) => {
  window.localStorage.setItem(ZHAZHA_TOKEN, payload.token);
  window.localStorage.setItem(ZHAZHA_USER, payload.userInfo.email);
};

const setSessionStorage = (payload) => {
  window.sessionStorage.setItem(ZHAZHA_TOKEN, payload.token);
  window.sessionStorage.setItem(ZHAZHA_USER, payload.userInfo.email);
};

export const userState = (state = initialState, action = initialAction) => {
  const { payload, type } = action;
  switch (type) {
    case USER_UPDATE:
      return {
        ...payload.userInfo,
      };
    case USER_DELETE:
      window.localStorage.clear();
      window.sessionStorage.clear();
      return { email: '' };
    case USER_SIGNUP:
      setLocalStorage(payload);
      return {
        ...payload.userInfo,
      };
    case USER_LOGIN:
      if (payload.rememberMe) {
        setLocalStorage(payload);
      } else {
        window.localStorage.clear();
        setSessionStorage(payload);
      }
      return {
        ...payload.userInfo,
      };
    default:
      return state;
  }
};

export default userState;
