import { Response, Request } from 'express'
import Prisma from '../database'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwt'

class AuthController {
  public async register (req: Request, res: Response): Promise<Response> {
    try {
      const user = await Prisma.user.create({
        data: req.body
      })

      return res.json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const user = await Prisma.user.findOne({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    user.password = undefined

    return res.json({
      user,
      token: generateToken(user)
    })
  }
}

export default new AuthController()
