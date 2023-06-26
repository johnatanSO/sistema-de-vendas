export interface NewUser {
  name: string
  email: string
  password: string
}

export interface IUsersRepository {
  create: (userData: NewUser) => Promise<NewUser>
  findByEmail: (email: string) => Promise<NewUser>
}
