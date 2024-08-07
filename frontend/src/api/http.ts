import axios, { AxiosResponse } from 'axios'
import { usersService } from '../services/usersService'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

http.interceptors.request.use(
  (config: any) => {
    const token = usersService.getToken()

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (config: AxiosResponse) => config,
  (error) => {
    const jwtExpired = error.response.data.message.includes('jwt expired')

    if (jwtExpired) {
      usersService.deleteToken()
    }
    return Promise.reject(error)
  },
)

export default http
