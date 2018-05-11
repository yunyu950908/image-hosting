import {
  USER_UPDATE,
  USER_DELETE,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_LOGIN,
  ZHAZHA_TOKEN,
  ZHAZHA_USER,
  REMEMBER_ME,
} from '../constants';

const userInfo = window.sessionStorage.getItem(ZHAZHA_USER) || window.localStorage.getItem(ZHAZHA_USER) || '{}';
const initialState = {
  ...JSON.parse(userInfo),
};

const initialAction = {
  type: '',
  payload: {},
};

const setLocalStorage = (payload) => {
  window.localStorage.setItem(ZHAZHA_TOKEN, payload.token);
  window.localStorage.setItem(ZHAZHA_USER, JSON.stringify(payload));
};

const setSessionStorage = (payload) => {
  window.sessionStorage.setItem(ZHAZHA_TOKEN, payload.token);
  window.sessionStorage.setItem(ZHAZHA_USER, JSON.stringify(payload));
};

const clearStorage = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
};

const cp = state => JSON.parse(JSON.stringify(state));

export const userState = (state = initialState, action = initialAction) => {
  const { payload, type } = action;
  const newState = cp(state);
  switch (type) {
    case USER_LOGIN:
      if (payload[REMEMBER_ME]) {
        setLocalStorage(payload);
      } else {
        clearStorage();
        setSessionStorage(payload);
      }
      Object.assign(newState, payload);
      break;
    case USER_SIGNUP:
      clearStorage();
      setLocalStorage(payload);
      break;
    case USER_LOGOUT:
    case USER_UPDATE:
    case USER_DELETE:
      clearStorage();
      return {};
    default:
  }
  return newState;
};

export default userState;
