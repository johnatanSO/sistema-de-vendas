import { NewUser } from '../components/screens/CreateAccount'
import { LoginUserData } from '../components/screens/Login'
import nookies, { setCookie, destroyCookie } from 'nookies'
import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'

const USER_INFO = 'sis-vendas:user_info[v1]'
const ACCESS_TOKEN_KEY = 'sis-vendas:token[v1]'
const ACCESS_REFRESH_TOKEN_KEY = 'sis-vendas:refresh_token[v1]'

interface LoginParams {
  userData: LoginUserData
}

interface RegisterParams {
  newUser: NewUser
}

interface IUser {
  _id: string
  name: string
  email: string
}

export const usersService = {
  getSession(ctx = null) {
    const token = this.getToken(ctx)

    return token
  },

  login({ userData }: LoginParams, httpClientProvider: IHttpClientProvider) {
    const body: any = { ...userData }

    return httpClientProvider.post('/signIn', {
      ...body,
    })
  },

  register(
    { newUser }: RegisterParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = { ...newUser }

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

  saveUser(user: IUser) {
    globalThis?.localStorage?.setItem(USER_INFO, JSON.stringify(user))
  },

  saveToken(token: string) {
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, token)

    setCookie(undefined, ACCESS_TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  deleteLocalUser() {
    globalThis?.localStorage?.removeItem(USER_INFO)
  },

  deleteToken() {
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY)

    destroyCookie(null, ACCESS_TOKEN_KEY)
  },

  deleteRefreshToken() {
    globalThis?.localStorage?.removeItem(ACCESS_REFRESH_TOKEN_KEY)

    destroyCookie(null, ACCESS_REFRESH_TOKEN_KEY)
  },

  saveRefreshToken(token: string) {
    globalThis?.localStorage?.setItem(ACCESS_REFRESH_TOKEN_KEY, token)

    setCookie(undefined, ACCESS_REFRESH_TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },

  getUserInfo() {
    const userString = globalThis?.localStorage?.getItem(USER_INFO)
    return JSON.parse(userString || 'null')
  },

  async updateRefreshTokenService(
    token: string | null,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.post('refreshToken', {
      token,
    })
  },
}
