import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/Users/UsersRepository'
import * as dotenv from 'dotenv'
import auth from '../config/auth'
dotenv.config()

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token não informado', 401)
  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secretToken)

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId.toString())
  
    if (!user) throw new AppError('Usuário inválido', 401)
  
    req.user = {
      userId: userId.toString(),
    }
    next()
  } catch (err) {
    console.log('ERROR', err)
    throw new AppError(`Token inválido - ${err.message}`, 401)
  }
}
