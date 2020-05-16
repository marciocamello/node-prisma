
import { secrets } from '../config/secrets'
import * as jwt from 'jsonwebtoken'

const generateToken = (payload) :string => {
  return jwt.sign({ id: payload.id }, secrets.JWT_SECRET, {
    expiresIn: 86400
  })
}

export {
  generateToken
}
