import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { hash } from 'bcrypt'
import { User } from '../../../entities/user'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateNewUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: IRequest): Promise<User> {
    const alreadExistUser = await this.usersRepository.findByEmail(name)

    if (alreadExistUser) {
      throw new AppError('Já existe um usuário cadastrado com este e-mail.')
    }

    const passwordHash = await hash(password, 10)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return newUser
  }
}
