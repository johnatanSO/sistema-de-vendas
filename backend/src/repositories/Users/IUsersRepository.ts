import { Types } from 'mongoose'

export interface NewUser {
  name: string
  email: string
  password: string
}

export interface User {
  _id: Types.ObjectId
  email: string
  password: string
  name: string
}

export interface IUsersRepository {
  create: (newUserData: NewUser) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
}
