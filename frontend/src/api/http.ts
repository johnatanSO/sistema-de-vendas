import axios from 'axios'
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
        Authorization: token,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
