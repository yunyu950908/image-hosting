const express = require('express');

const router = express.Router();
const apiRes = require('../utils/api_response');
const UserModel = require('../models/user');
const UserService = require('../services/user');

/**
 * /user/signup 用户注册
 * */
router.post('/signup', (req, res, next) => {
  (async () => {
    const { email, password } = req.body;
    // todo 做 email 接收验证码校验, 此处暂时只要是个差不多的字符串就阔以
    UserService.verifyEmail(email);
    UserService.verifyPassword(password);
    // email password 验证通过后插入数据库
    const result = await UserModel.createUserByEmailAndPwd({ email, password });
    return result;
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

// /**
//  * /user/login 用户登录
//  * */
// router.post('/login', (req, res, next) => {
//   (async () => {
//
//   })()
//     .then(() => {
//     })
//     .catch(() => {
//     });
// });
//
// /**
//  * /user/update 更新用户信息
//  * */
// router.post('/update', (req, res, next) => {
//   (async () => {
//
//   })()
//     .then(() => {
//     })
//     .catch(() => {
//     });
// });

module.exports = router;
