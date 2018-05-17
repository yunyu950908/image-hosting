const API_PATH = process.env.REACT_APP_API_PATH;

function concatApi(routePath) {
  return `${API_PATH}${routePath}`;
}

export const USER_SIGNUP = concatApi('/user/signup');
export const USER_LOGIN = concatApi('/user/login');
export const USER_MAIL = concatApi('/user/mail');
export const USER_FORGET = concatApi('/user/forget');
export const USER_UPDATE = concatApi('/user/update');
export const USER_STORE = concatApi('/user/store');

