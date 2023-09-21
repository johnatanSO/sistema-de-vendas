import { User } from '../../entities/user'

export interface INewUserDTO {
  name: string
  email: string
  password: string
}

export interface IUsersRepository {
  create: (newUserData: INewUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (_id: string) => Promise<User>
}
