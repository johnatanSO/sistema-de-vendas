import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'

interface LoginParams {
  userData: LoginUserData
}

interface RegisterParams {
  newUser: NewUser
}

interface GetSessionParams {
  logged: boolean
}

export const usersService = {
  async getSession({ logged }: GetSessionParams) {
    return logged
  },

  async login({ userData }: LoginParams) {
    const body: any = { ...userData }

    return http.post('/users/login', {
      ...body,
    })
  },

  async register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http.post('/users/register', {
      ...body,
    })
  },
}
