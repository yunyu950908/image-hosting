const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: 1 },
  password: { type: String, required: true },
  username: { type: String },
  nickname: { type: String },
  hostSetting: {
    leancloud: {
      instanceName: { type: String, required: true, default: 'leancloud' },
      host: { type: String, required: true, default: 'https://leancloud.cn/' },
      APP_ID: { type: String, required: true, default: '尚未配置' },
      APP_KEY: { type: String, required: true, default: '尚未配置' },
      // fileData: [], // 直接在前端 leancloud API 增 删 查
    },
    qiniu: {
      instanceName: { type: String, required: true, default: '七牛云' },
      host: { type: String, required: true, default: 'https://www.qiniu.com/' },
      AK: { type: String, required: true, default: '尚未配置' },
      SK: { type: String, required: true, default: '尚未配置' },
    },
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
 * findUserCommon 通用用户查找
 * @param userInfo
 * @return { _id, email, hostSetting }
 * */
async function findUserCommon(userInfo) {
  const result = await UserModel.findOne(userInfo, { password: 0 });
  if (!result) return null;
  return result;
}

/**
 * createUserByEmailAndPwd 通过 email 和 password 创建用户
 * @param userInfo email String 注册邮箱
 * @param userInfo password String 注册密码
 * */
async function createUserByEmailAndPwd(userInfo) {
  const { email, password } = userInfo;
  const result = await UserModel.create({ email, password });
  if (!result) return null;
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
  const result = await UserModel.findOne({ email, password }, { password: 0 });
  return result;
}

/**
 * findUserAndUpdata
 * @param queryInfo Object
 * @param updateInfo Object
 * */
async function findUserAndUpdate(queryInfo, updateInfo) {
  const result = await UserModel.findOneAndUpdate(queryInfo, updateInfo, { new: true });
  if (!result) return null;
  return {
    email: result.email,
    hostSetting: result.hostSetting,
  };
}

module.exports = {
  findUserCommon,
  findUserAndUpdate,
  findUserByUsername,
  findUserByEmail,
  createUserByEmailAndPwd,
  findUserByEmailAndPwd,
};
