import { Types } from 'mongoose'

export interface NewUser {
  name: string
  email: string
  password: string
}

export interface User {
  _id?: Types.ObjectId
  email: string
  password: string
}

export interface IUsersRepository {
  create: (newUserData: NewUser) => Promise<NewUser>
  findByEmail: (email: string) => Promise<NewUser>
  authenticate: (userDataLogin: User) => Promise<User>
}
