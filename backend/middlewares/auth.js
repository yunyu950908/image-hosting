const JWTService = require('../services/jwt_service');
const NoAuthError = require('../errors/no_auth_error');

const auth = options => (req, res, next) => {
  (async () => {
    const authInfo = req.get('Authorization');
    const { email = null } = req.body;
    const token = (authInfo && authInfo.split(' ')[1]) || '';
    if (!(authInfo && email && token)) throw new NoAuthError('授权信息错误', 'Authorization header error');
    let authResult = null;
    try {
      authResult = JWTService.verifyJWT(token);
    } catch (e) {
      throw new NoAuthError('token 验证错误', 'JWT auth token error');
    }
    return authResult;
  })()
    .then((r) => {
      req.authInfo = r;
      next();
    })
    .catch((e) => {
      next(e);
    });
};

module.exports = auth;
