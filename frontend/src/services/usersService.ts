import http from '../api/http'
import { NewUser } from '../screens/CreateAccount'
import { LoginUserData } from '../screens/Login'
import { setCookie, /* destroyCookie, */ parseCookies } from 'nookies'

const USER_INFO = 'userInfo'
const ACCESS_TOKEN_KEY = 'accessToken'

interface LoginParams {
  userData: LoginUserData
}

interface RegisterParams {
  newUser: NewUser
}

export const usersService = {
  async getSession() {
    const token = await this.getToken()

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
      .then(async (res) => {
        await this.saveUser(res.data)
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
      .then(async (res) => {
        await this.saveUser(res.data)
        return res.data
      })
      .catch((err) => err.response.data)
  },

  async getToken() {
    const cookies = parseCookies()
    const token = cookies[ACCESS_TOKEN_KEY]

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
    localStorage?.setItem(USER_INFO, JSON.stringify(userData))
    localStorage?.setItem(ACCESS_TOKEN_KEY, userData?.token)
    setCookie(undefined, ACCESS_TOKEN_KEY, userData?.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  },
}
