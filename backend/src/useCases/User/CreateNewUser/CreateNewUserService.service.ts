import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { hash } from 'bcrypt'
import { User } from '../../../entities/user'
import { AppError } from '../../../errors/AppError'
import * as dotenv from 'dotenv'
dotenv.config()
const saltRounds = 10

interface IRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

@injectable()
export class CreateNewUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    password,
    confirmPassword,
  }: IRequest): Promise<User> {
    if (!name) throw new AppError('Nome de usuário não informado')
    if (!email) throw new AppError('E-mail do usuário não informado')
    if (!password) throw new AppError('Senha do usuário não informada')
    if (password !== confirmPassword)
      throw new AppError('Confirmação de senha incorreta')

    const alreadExistUser = await this.usersRepository.findByEmail(email)

    if (alreadExistUser) {
      throw new AppError('Já existe um usuário cadastrado com este e-mail')
    }

    const passwordHash = await hash(password, saltRounds)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return newUser
  }
}
