import { inject, injectable } from 'tsyringe'
import {
  IUsersRepository,
  NewUser,
  User,
} from '../../repositories/Users/IUsersRepository'
import { hash } from 'bcrypt'

@injectable()
export class CreateNewUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: NewUser): Promise<User> {
    const alreadExistUser = await this.usersRepository.findByEmail(name)

    if (alreadExistUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail.')
    }

    const passwordHash = await hash(password, 10)
    const newUser = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return newUser
  }
}
