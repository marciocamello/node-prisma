"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _jsonwebtoken = require('jsonwebtoken'); var jwt = _interopRequireWildcard(_jsonwebtoken);
var _secrets = require('../../config/secrets');
var _database = require('../../database'); var _database2 = _interopRequireDefault(_database);


async function jwtMiddleware (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    const bearerRegex = /(^Bearer (.*))/gm
    const token = bearerRegex.exec(authHeader)

    const decoded = jwt.verify(token[2], _secrets.secrets.JWT_SECRET) 

    await _database2.default.user.findOne({
      where: { id: parseInt(decoded.id) }
    })

    console.log(decoded)

    next()
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
}

exports. default = jwtMiddleware
