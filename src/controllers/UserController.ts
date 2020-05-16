import { Response, Request } from 'express'
import Prisma from '../database'
import bcrypt from 'bcryptjs'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await Prisma.user.findMany()

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      data.password = await bcrypt.hash(data.password, 8)

      const user = await Prisma.user.create({
        data
      })

      return res.json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 8)
      }

      await Prisma.user.update({
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

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      await Prisma.user.delete({
        where: { id: parseInt(req.params.id) }
      })

      return res.json({ message: 'User deleted with success' })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new UserController()
