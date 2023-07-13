export interface NewUser {
  name: string
  email: string
  password: string
}

export interface IUsersRepository {
  create: (newUserData: NewUser) => Promise<NewUser>
  findByEmail: (email: string) => Promise<NewUser>
  authenticate: (userDataLogin: any) => Promise<any>
}
