"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _database = require('../database'); var _database2 = _interopRequireDefault(_database);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class UserController {
   async index (req, res) {
    const users = await _database2.default.user.findMany()

    return res.json(users)
  }

   async store (req, res) {
    try {
      const data = req.body
      data.password = await _bcryptjs2.default.hash(data.password, 8)

      const user = await _database2.default.user.create({
        data
      })

      return res.json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

   async update (req, res) {
    try {
      const data = req.body

      if (data.password) {
        data.password = await _bcryptjs2.default.hash(data.password, 8)
      }

      await _database2.default.user.update({
        where: { id: parseInt(req.params.id) },
        data
      })

      req.body.password = undefined

      return res.json({
        id: req.params.id,
        ...req.body
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

   async delete (req, res) {
    try {
      await _database2.default.user.delete({
        where: { id: parseInt(req.params.id) }
      })

      return res.json({ message: 'User deleted with success' })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

exports. default = new UserController()
