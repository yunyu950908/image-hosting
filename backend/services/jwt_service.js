const JWT = require('jsonwebtoken');

const JWTConfig = require('../config/cipher/jwt_config');

const setJWT = objectId => JWT.sign(
  { _id: objectId, expiresIn: Math.floor((Date.now() / 1000)) + JWTConfig.EXPIRES_IN },
  JWTConfig.SIGN_KEY,
);

const verifyJWT = token => JWT.verify(token, JWTConfig.SIGN_KEY);

module.exports = {
  setJWT,
  verifyJWT,
};
