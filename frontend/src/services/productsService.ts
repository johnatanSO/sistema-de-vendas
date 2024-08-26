import {
  CreateProductDTO,
  DeleteProductDTO,
  GetAllProductsDTO,
  UpdateProductDTO,
} from '../dtos/ProductDTOS'
import { IHttpClientProvider } from './../providers/HttpClientProvider/IHttpClientProvider'
import { usersService } from './usersService'

export const productsService = {
  userInfo: usersService.getUserInfo(),

  getAll(
    { filters }: GetAllProductsDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const params = {
      ...filters,
      userId: this.userInfo?._id,
    }

    return httpClientProvider.get('/produtos/', {
      params,
    })
  },

  getDefaultProducts(httpClientProvider: IHttpClientProvider) {
    const params = {
      userId: this.userInfo?._id,
    }

    return httpClientProvider.get('/produtos/padroes/', {
      params,
    })
  },

  create(
    { name, stock, value, isDefault }: CreateProductDTO,
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
    { _id, name, stock, value, isDefault }: UpdateProductDTO,
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

  delete(
    { idProduct }: DeleteProductDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.delete(`/produtos/`, {
      params: {
        idProduct,
      },
    })
  },
}
