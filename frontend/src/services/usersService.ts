import nookies, { setCookie, destroyCookie } from 'nookies'
import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'
import { IUser } from '../models/interfaces/IUser'
import { LoginDTO, RegisterUserDTO } from '../dtos/UserDTOS'

const USER_INFO = 'sis-vendas:user_info[v1]'
const ACCESS_TOKEN_KEY = 'sis-vendas:token[v1]'
const ACCESS_REFRESH_TOKEN_KEY = 'sis-vendas:refresh_token[v1]'

export const usersService = {
  async getSession(ctx = null) {
    const token = this.getToken(ctx)

    return token
  },

  login(
    { email, password }: LoginDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = { email, password }

    return httpClientProvider.post('/signIn', {
      ...body,
    })
  },

  register(
    { name, email, password, confirmPassword }: RegisterUserDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = { name, email, password, confirmPassword }

    return httpClientProvider.post('/users', {
      ...body,
    })
  },

  getToken(ctx = null) {
    const cookies = nookies.get(ctx)

    return cookies ? cookies[ACCESS_TOKEN_KEY] : null
  },

  getRefreshToken(ctx = null) {
    const cookies = nookies.get(ctx)

    return cookies ? cookies[ACCESS_REFRESH_TOKEN_KEY] : null
  },

  async saveUser(user: IUser) {
    globalThis?.localStorage?.setItem(USER_INFO, JSON.stringify(user))
    setCookie(undefined, ACCESS_TOKEN_KEY, JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  async saveToken(token: string) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, token)

    setCookie(undefined, ACCESS_TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  async saveRefreshToken(token: string) {
    globalThis?.localStorage?.setItem(ACCESS_REFRESH_TOKEN_KEY, token)

    setCookie(undefined, ACCESS_REFRESH_TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  deleteLocalUser() {
    globalThis?.localStorage?.removeItem(USER_INFO)
    destroyCookie(null, USER_INFO)
  },

  deleteToken() {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)

    destroyCookie(null, ACCESS_TOKEN_KEY)
  },

  deleteRefreshToken() {
    globalThis?.localStorage?.removeItem(ACCESS_REFRESH_TOKEN_KEY)

    destroyCookie(null, ACCESS_REFRESH_TOKEN_KEY)
  },

  getUserInfo() {
    const userString = globalThis?.localStorage?.getItem(USER_INFO)
    const userParsed = JSON.parse(userString || 'null')

    if (userParsed) return userParsed

    return null
  },

  async updateRefreshTokenService(
    token: string | null,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.post('/refreshToken', {
      token,
    })
  },
}
