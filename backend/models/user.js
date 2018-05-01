const mongoose = require('mongoose');

const { Schema } = mongoose;

// pbkdf2 加密密码
const pbkdf2Async = require('bluebird').promisify(require('crypto').pbkdf2);
const PasswordConfig = require('../config/cipher/password_config');

const { SALT, ITERATIONS, KEYLEN, DIGEST } = PasswordConfig;
const encryptWithPbkdf2 = password => pbkdf2Async(password, SALT, ITERATIONS, KEYLEN, DIGEST);

const HttpReqParaError = require('../errors/http_request_param_error');
const ErrorCode = require('../errors/error_code');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: 1 },
  password: { type: String, required: true },
  username: { type: String },
  nickname: { type: String },
  hostProvider: {
    leancloud: {
      config: {
        APP_ID: { type: String },
        APP_KEY: { type: String },
      },
      // fileData: [], // 直接在前端 leancloud API 增 删 查
    },
    qiniu: {
      config: {
        AK: { type: String },
        SK: { type: String },
        hostname: { type: String },
        imageMark: { type: String },
      },
    },
    aliyun: {},
  },
});

const UserModel = mongoose.model('user', UserSchema);

/**
 * findUserByUsername 通过 username 查找用户
 * @param username String 注册用户名
 * */
async function findUserByUsername(username) {
  const result = await UserModel.findOne({ username }, { password: 0 });
  return result;
}

/**
 * findUserByEmail 通过 email 查找用户
 * @param email String 注册邮箱
 * */
async function findUserByEmail(email) {
  const user = await UserModel.findOne({ email }, { password: 0 });
  return user;
}

/**
 * createUserByEmailAndPwd 通过 email 和 password 创建用户
 * @param userInfo email String 注册邮箱
 * @param userInfo password String 注册密码
 * */
async function createUserByEmailAndPwd(userInfo) {
  const { email, password } = userInfo;
  // pbkdf2 加密
  const pwdWithPbkdf2 = await encryptWithPbkdf2(password);
  // 用加密串创建 user
  const result = await UserModel.create({ email, password: pwdWithPbkdf2 });
  return {
    _id: result._id,
    email: result.email,
  };
}

/**
 * findUserByEmailAndPwd 通过 email 和 password 查找用户
 * @param userInfo email String 用户邮箱
 * @param userInfo password String 用户密码
 * */
async function findUserByEmailAndPwd(userInfo) {
  const { email, password } = userInfo;
  const pwdWithPbkdf2 = await encryptWithPbkdf2(password);
  const result = await UserModel.findOne({ email, password: pwdWithPbkdf2 }, { password: 0 });
  return result;
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUserByEmailAndPwd,
  findUserByEmailAndPwd,
};
