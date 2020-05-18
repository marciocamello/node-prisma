"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _JwtMiddleware = require('./middlewares/auth/JwtMiddleware'); var _JwtMiddleware2 = _interopRequireDefault(_JwtMiddleware);
var _AuthController = require('./controllers/AuthController'); var _AuthController2 = _interopRequireDefault(_AuthController);
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const routes = _express.Router.call(void 0, )

routes.get('/', (req, res) => {
  return res.json({ message: 'Node Prisma API' })
})

routes.post('/register', _AuthController2.default.register)
routes.post('/login', _AuthController2.default.login)

routes.get('/users', _JwtMiddleware2.default, _UserController2.default.index)
routes.post('/users', _JwtMiddleware2.default, _UserController2.default.store)
routes.put('/users/:id', _JwtMiddleware2.default, _UserController2.default.update)
routes.delete('/users/:id', _JwtMiddleware2.default, _UserController2.default.delete)

exports. default = routes
