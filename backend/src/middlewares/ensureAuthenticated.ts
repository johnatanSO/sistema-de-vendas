import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/Users/UsersRepository'
import * as dotenv from 'dotenv'
dotenv.config()

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token não informado', 401)
  const [, token] = authHeader.split(' ')

  const { sub: userId } = verify(token, process.env.SECRET)

  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(userId.toString())

  if (!user) throw new AppError('Usuário inválido', 401)

  req.user = {
    userId: userId.toString(),
  }

  next()
}
