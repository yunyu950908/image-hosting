/**
 * verifyPassword 密码校验
 * */
export function verifyPassword(password) {
  const regHasNum = /\d/;
  const regHasLowercase = /[a-z]/;
  const regHasUppercase = /[A-Z]/;
  const hasEnoughChars = password.length > 8 && password.length < 16;
  // const regAll = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9A-Z]+$)(?![0-9a-z]+$)[0-9A-Za-z]{8,16}$/;
  return {
    hasNum: !!password.match(regHasNum),
    hasLowercase: !!password.match(regHasLowercase),
    hasUppercase: !!password.match(regHasUppercase),
    hasEnoughChars,
  };
}

/**
 * verifyEmail 邮箱校验
 * */
export function verifyEmail(email) {
  const reg = /^[a-zA-Z0-9_-]+@[a-z0-9-]+[.][a-z\u4e00-\u9fa5]{2,4}$/;
  return !!email.match(reg);
}
