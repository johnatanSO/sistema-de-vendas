import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'
import nookies, { setCookie, destroyCookie } from 'nookies'

const USER_INFO = 'userInfo'
const ACCESS_TOKEN_KEY = ':sis-vendas[v1]:'

interface LoginParams {
  userData: LoginUserData
}

interface RegisterParams {
  newUser: NewUser
}

export const usersService = {
  async getSession(ctx = null) {
    const token = this.getToken(ctx)

    if (token) {
      return await this.verifyToken(token)
    }
  },

  async login({ userData }: LoginParams) {
    const body: any = { ...userData }

    return http.post('/signIn', {
      ...body,
    })
  },

  async register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http.post('/users', {
      ...body,
    })
  },

  getToken(ctx = null) {
    const cookies = nookies.get(ctx)
    return cookies ? cookies[ACCESS_TOKEN_KEY] : null
  },

  async verifyToken(token: string) {
    const res = await http.post('/verify_token', {
      token,
    })

    const { hasSession } = res.data

    if (hasSession) return true

    return false
  },

  async saveUser(responseUser: any) {
    globalThis?.localStorage?.setItem(
      USER_INFO,
      JSON.stringify(responseUser.user),
    )
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, responseUser?.token)
    setCookie(undefined, ACCESS_TOKEN_KEY, responseUser?.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  async deleteToken() {
    globalThis?.localStorage?.removeItem(USER_INFO)
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)
    destroyCookie(null, ACCESS_TOKEN_KEY)
  },

  getUserInfo() {
    return JSON.parse(globalThis?.localStorage?.getItem(USER_INFO) || '{}')
  },
}
