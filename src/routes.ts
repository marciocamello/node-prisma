import { Router } from 'express'

import JwtMiddleware from './middlewares/auth/JwtMiddleware'
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Node Prisma API' })
})

routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)

routes.get('/users', JwtMiddleware, UserController.index)
routes.post('/users', JwtMiddleware, UserController.store)
routes.put('/users/:id', JwtMiddleware, UserController.update)
routes.delete('/users/:id', JwtMiddleware, UserController.delete)

export default routes
