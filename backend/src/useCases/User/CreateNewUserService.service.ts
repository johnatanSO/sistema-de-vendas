import { inject, injectable } from 'tsyringe'
import {
  IUsersRepository,
  NewUser,
} from '../../repositories/Users/IUsersRepository'

@injectable()
export class CreateNewUserService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: NewUser): Promise<NewUser> {
    const alreadExistUser = await this.usersRepository.findByEmail(name)

    if (alreadExistUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail.')
    }

    const newUser = this.usersRepository.create({
      name,
      email,
      password,
    })

    return newUser
  }
}
