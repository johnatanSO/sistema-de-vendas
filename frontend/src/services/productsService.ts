import { IHttpClientProvider } from './../providers/HttpClientProvider/IHttpClientProvider'
import { usersService } from './usersService'

interface GetAllParams {
  filters: any
}

interface CreateParams {
  name: string
  value: number
  stock: number
  isDefault: boolean
}

interface UpdateParams {
  _id: string
  name: string
  value: number
  stock: number
  isDefault: boolean
}

interface DeleteParams {
  idProduct: string
}

export const productsService = {
  userInfo: usersService.getUserInfo(),

  getAll({ filters }: GetAllParams, httpClientProvider: IHttpClientProvider) {
    const params = {
      ...filters,
      userId: this.userInfo._id,
    }

    return httpClientProvider.get('/produtos/', {
      params,
    })
  },

  getDefaultProducts(httpClientProvider: IHttpClientProvider) {
    const params = {
      userId: this.userInfo._id,
    }

    return httpClientProvider.get('/produtos/padroes/', {
      params,
    })
  },

  create(
    { name, stock, value, isDefault }: CreateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      stock,
      value,
      name,
      isDefault,
      userInfo: this.userInfo,
    }

    return httpClientProvider.post('/produtos', {
      ...body,
    })
  },

  update(
    { _id, name, stock, value, isDefault }: UpdateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      _id,
      name,
      stock,
      value,
      isDefault,
    }

    return httpClientProvider.put('/produtos/', {
      ...body,
    })
  },

  delete({ idProduct }: DeleteParams, httpClientProvider: IHttpClientProvider) {
    return httpClientProvider.delete(`/produtos/`, {
      params: {
        idProduct,
      },
    })
  },
}
