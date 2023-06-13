import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'

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

  async login() {},

  async register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http.post('/users/register', {
      ...body,
    })
  },
}
