"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }
var _secrets = require('../config/secrets');
var _jsonwebtoken = require('jsonwebtoken'); var jwt = _interopRequireWildcard(_jsonwebtoken);

const generateToken = (payload) => {
  return jwt.sign({ id: payload.id }, _secrets.secrets.JWT_SECRET, {
    expiresIn: 86400
  })
}



exports.generateToken = generateToken;
