import { IHttpClientProvider } from './../providers/HttpClientProvider/IHttpClientProvider'
import { NewProductData } from '../components/screens/Products/ModalCreateNewProduct'
import { usersService } from './usersService'

interface GetAllParams {
  filters: any
}

interface CreateParams {
  newProductData: NewProductData
}

interface UpdateParams {
  productData: any
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
    { newProductData }: CreateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      ...newProductData,
      stock: Number(newProductData?.stock),
      value: Number(newProductData?.value),
      userInfo: this.userInfo,
    }

    return httpClientProvider.post('/produtos', {
      ...body,
    })
  },

  update(
    { productData }: UpdateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      ...productData,
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
