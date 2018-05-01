const express = require('express');

const router = express.Router();
const apiRes = require('../utils/api_response');
const UserService = require('../services/user');
const auth = require('../middlewares/auth');


/**
 * /user/signup 用户注册
 * */
router.post('/signup', (req, res, next) => {
  (async () => {
    // todo 做 email 接收验证码校验, 此处暂时只要是个差不多的字符串就阔以
    const userInfo = req.body;
    const result = await UserService.addNewUser(userInfo);
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

/**
 * /user/login 用户登录
 * */
router.post('/login', (req, res, next) => {
  (async () => {
    const userInfo = req.body;
    const result = await UserService.userLogin(userInfo);
    return result;
  })()
    .then((r) => {
      if (r) {
        res.data = r;
        apiRes(req, res);
      }
    })
    .catch((e) => {
      next(e);
    });
});

/**
 * /user/update 更新用户信息
 * */
router.post('/update', auth(), (req, res, next) => {
  apiRes(req, res);
});

/**
 * 
 * @param 
 * @param 
 * */

module.exports = router;
