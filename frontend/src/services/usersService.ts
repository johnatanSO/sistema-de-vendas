import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'

export const usersService = {
  async getSession() {},

  async login() {},

  async register(userData: NewUser) {
    const body = { ...userData }
    return http.post('/users/register', {
      ...body,
    })
  },
}
