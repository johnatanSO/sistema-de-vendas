import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { IHttpClientProvider } from './IHttpClientProvider'
import { usersService } from '../../services/usersService'
import { HTTP_STATUS_CODE } from '../../models/enums/HttpStatusCode'
import { useRouter } from 'next/router'

export class AxiosHttpClientProvider implements IHttpClientProvider {
  private httpIntance: Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  })

  private static _instance = new AxiosHttpClientProvider()

  constructor() {
    if (AxiosHttpClientProvider._instance) {
      throw new Error(
        'Erro ao criar instância do AxiosHttpClientProvider. Execute getInstance() para criar uma nova',
      )
    }
    AxiosHttpClientProvider._instance = this

    this.httpIntance.interceptors.request.use(
      (config: any) => {
        const token = usersService.getToken()

        return {
          ...config,
          headers: {
            ...config.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.httpIntance.interceptors.response.use(
      (config: AxiosResponse) => config,
      async (error: AxiosError) => {
        try {
          const tokenExpired =
            error?.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED

          const router = useRouter()
          if (tokenExpired) {
            router.push('/login')
          }
        } catch (err) {
          console.log(err)
        }

        return Promise.reject(error)
      },
    )
  }

  public static getInstance(): AxiosHttpClientProvider {
    return AxiosHttpClientProvider._instance
  }

  async post(url: string, body?: any, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.post(url, body, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async put(url: string, body?: any, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.put(url, body, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async get(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.get(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async patch(url: string, body?: any, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.patch(url, body, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }

  async delete(url: string, options?: any) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await this.httpIntance.delete(url, options)
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>
      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      data: axiosResponse?.data,
    }
  }
}
