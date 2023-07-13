import { UserModel } from '../../models/user'
import { IUsersRepository, NewUser } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  async create({ name, password, email }: NewUser): Promise<NewUser> {
    const newUser = new UserModel({
      name,
      password,
      email,
    })
    await newUser.save()
    return newUser
  }

  async findByEmail(email: string): Promise<NewUser> {
    return await UserModel.findOne({ email })
  }

  async authenticate({ email, password }): Promise<any> {
    return await UserModel.findOne({ email, password })
  }
}
