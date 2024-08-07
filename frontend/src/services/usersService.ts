import http from '../api/http'
import { NewUser } from '../components/screens/CreateAccount'
import { LoginUserData } from '../components/screens/Login'
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
  getSession(ctx = null) {
    const token = this.getToken(ctx)

    return token
  },

  login({ userData }: LoginParams) {
    const body: any = { ...userData }

    return http.post('/signIn', {
      ...body,
    })
  },

  register({ newUser }: RegisterParams) {
    const body = { ...newUser }

    return http.post('/users', {
      ...body,
    })
  },

  getToken(ctx = null) {
    const cookies = nookies.get(ctx)

    return cookies ? cookies[ACCESS_TOKEN_KEY] : null
  },

  saveUser(responseUser: any) {
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

  deleteToken() {
    globalThis?.localStorage?.removeItem(USER_INFO)

    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)

    destroyCookie(null, ACCESS_TOKEN_KEY)
  },

  getUserInfo() {
    const userString = globalThis?.localStorage?.getItem(USER_INFO)
    return JSON.parse(userString || 'null')
  },
}
