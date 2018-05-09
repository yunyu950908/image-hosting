const express = require('express');

const router = express.Router();
const apiRes = require('../utils/api_response');
const auth = require('../middlewares/auth');
const UserService = require('../services/user');
const CommonService = require('../services/common_service');
const HTTPReqParamError = require('../errors/http_request_param_error');
const InternalServerError = require('../errors/internal_server_error');
const UserModel = require('../models/user');

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

/**
 * /user/store 用户的存储配置
 * @param storeConfig action String required 'get' 'set'
 * @param storeConfig providerName String
 * @param storeConfig providerConfig Object
 * todo 临时处理，没有校验每个字段的值
 * */
router.post('/store', auth(), (req, res, next) => {
  (async () => {
    let result = null;
    const { action, providerName, providerConfig } = req.body;
    const { _id } = req.authInfo;
    if (!action) throw CommonService.requiredEmptyError('action');
    if (action === 'get') {
      result = await UserModel.findUserCommon({ _id });
    } else if (action === 'set') {
      if (!(providerName && providerConfig)) throw CommonService.requiredEmptyError('providerName, providerConfig');
      result = await UserModel.findUserAndUpdate({ _id }, { [providerName]: providerConfig });
    } else {
      throw new HTTPReqParamError('action 行为错误，必须是 set / get ', `invalid action type ${action}`, 'action');
    }
    if (!result) throw new InternalServerError(`/user/store error, req body: ${JSON.stringify(req.body)}`);
    return result;
  })()
    .then((r) => {
      res.data = {
        email: r.email,
        hostSetting: r.hostSetting || {},
      };
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
