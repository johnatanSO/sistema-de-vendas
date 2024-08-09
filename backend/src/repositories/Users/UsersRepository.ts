import { Model } from 'mongoose'
import { User, UserModel } from '../../entities/user'
import { INewUserDTO, IUsersRepository } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  model: Model<User> = UserModel
  async create({ name, password, email }: INewUserDTO): Promise<User> {
    const newUser = await this.model.create({
      name,
      password,
      email,
    })

    await newUser.save()

    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email }).lean()
  }

  async findById(_id: string): Promise<User> {
    return await this.model.findOne({ _id }).lean()
  }
}
