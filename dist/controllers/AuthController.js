"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _database = require('../database'); var _database2 = _interopRequireDefault(_database);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jwt = require('../utils/jwt');

class AuthController {
   async register (req, res) {
    try {
      const user = await _database2.default.user.create({
        data: req.body
      })

      return res.json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

   async login (req, res) {
    const { email, password } = req.body

    const user = await _database2.default.user.findOne({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!await _bcryptjs2.default.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    user.password = undefined

    return res.json({
      user,
      token: _jwt.generateToken.call(void 0, user)
    })
  }
}

exports. default = new AuthController()
