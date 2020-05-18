"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _compression = require('compression'); var _compression2 = _interopRequireDefault(_compression);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

class App {
  

   constructor () {
    this.express = _express2.default.call(void 0, )

    this.middlewares()
    this.routes()
  }

   middlewares () {
    this.express.use(_express2.default.json())
    this.express.use(_express2.default.urlencoded({ extended: false }))
    this.express.use(_compression2.default.call(void 0, ))
    this.express.use(_cors2.default.call(void 0, ))
  }

   routes () {
    this.express.use(_routes2.default)
  }
}

exports. default = new App().express
