import {
  IUsersRepository,
  NewUser,
} from '../repositories/Users/IUsersRepository'

export class CreateNewUserService {
  usersRepository: IUsersRepository
  constructor(productsRepository: IUsersRepository) {
    this.usersRepository = productsRepository
  }

  async execute({ name, email, password }: NewUser): Promise<NewUser> {
    const alreadExistUser = await this.usersRepository.findByEmail(name)

    if (alreadExistUser) {
      throw new Error('Já existe um usuário cadastrado com este e-mail!')
    }

    const newProduct = this.usersRepository.create({
      name,
      email,
      password,
    })

    return newProduct
  }
}
