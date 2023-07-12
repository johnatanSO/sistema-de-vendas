import { NextRequest } from 'next/server'
import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'

const ACCESS_TOKEN_KEY = 'accessToken'

interface LoginParams {
  userData: LoginUserData
}

interface RegisterParams {
  newUser: NewUser
}

export const usersService = {
  async getSession(request: NextRequest) {
    const token = await this.getToken(request)

    if (token) {
      return await this.verifyToken(token)
    }
  },

  async login({ userData }: LoginParams) {
    const body: any = { ...userData }

    return http
      .post('/users/login', {
        ...body,
      })
      .then((res) => {
        this.saveToken(res.data)
        return res.data
      })
      .catch((err) => err.response.data)
  },

  async register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http
      .post('/users/register', {
        ...body,
      })
      .then((res) => {
        this.saveToken(res.data)
        return res.data
      })
      .catch((err) => err.response.data)
  },

  async getToken(request: NextRequest) {
    const token = request.cookies.get(ACCESS_TOKEN_KEY)
    return token || undefined
  },

  async verifyToken(token: string) {
    console.log('TOKEN ACCESS, ', token)
    /* TODO: Criar requisição para verificar o token no back-end. */
    /* const tokenIsValid = await http.post('/users/verify_token/', { token })
    if (tokenIsValid) return true
    return false */
    return true
  },

  async saveToken({ token }: { token: string }) {},
}
