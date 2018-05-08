const express = require('express');

const router = express.Router();
const apiRes = require('../utils/api_response');
const auth = require('../middlewares/auth');
const UserService = require('../services/user');
const CommonService = require('../services/common_service');

/**
 * /user/mail
 * @param userInfo email String required
 * */
router.post('/mail', (req, res, next) => {
  (async () => {
    const { email } = req.body;
    const result = await UserService.sendSecurityCode(email);
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
 * /user/signup 用户注册
 * */
router.post('/signup', (req, res, next) => {
  (async () => {
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
  (async () => {
    const { _id } = req.authInfo;
    const { action } = req.body;
    let result = null;
    if (action === 'email') {
      result = await UserService.userUpdateEmail(_id, req.body);
    } else if (action === 'pwd') {
      result = await UserService.userUpdatePwd(_id, req.body);
    } else {
      throw CommonService.requiredEmptyError('action');
    }
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
 * /user/forget
 * */
router.post('/forget', (req, res, next) => {
  (async () => {
    const result = await UserService.handleForgetPwd(req.body);
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

module.exports = router;
