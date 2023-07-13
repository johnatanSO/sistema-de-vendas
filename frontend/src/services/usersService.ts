import { NextRequest } from 'next/server'
import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'
import { setCookie, destroyCookie } from 'nookies'

const USER_INFO = 'userInfo'
const ACCESS_TOKEN_KEY = ':sis-vendas[v1]:'

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

  async saveUser(userData: any) {
    globalThis?.localStorage?.setItem(USER_INFO, JSON.stringify(userData))
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, userData?._id)
    setCookie(undefined, ACCESS_TOKEN_KEY, userData?._id, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  async deleteToken() {
    globalThis?.localStorage?.removeItem(USER_INFO)
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
    destroyCookie(null, ACCESS_TOKEN_KEY)
  },
}
