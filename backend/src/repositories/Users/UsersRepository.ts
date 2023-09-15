import { UserModel } from '../../entities/user'
import { IUsersRepository, NewUser, User } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  async create({ name, password, email }: NewUser): Promise<User> {
    const newUser = new UserModel({
      name,
      password,
      email,
    })
    await newUser.save()
    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return await UserModel.findOne({ email })
  }

  async findById(_id: string): Promise<User> {
    return await UserModel.findOne({ _id })
  }
}
