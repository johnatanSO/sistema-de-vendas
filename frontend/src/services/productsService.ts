import http from '../api/http'
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

  getAll({ filters }: GetAllParams) {
    const params = {
      ...filters,
      userId: this.userInfo._id,
    }

    return http.get('/produtos/', {
      params,
    })
  },

  getDefaultProducts() {
    const params = {
      userId: this.userInfo._id,
    }

    return http.get('/produtos/padroes/', {
      params,
    })
  },

  create({ newProductData }: CreateParams) {
    const body = {
      ...newProductData,
      stock: Number(newProductData?.stock),
      value: Number(newProductData?.value),
      userInfo: this.userInfo._id,
    }

    return http.post('/produtos', {
      ...body,
    })
  },

  update({ productData }: UpdateParams) {
    const body = {
      ...productData,
    }

    return http.put('/produtos/', {
      ...body,
    })
  },

  delete({ idProduct }: DeleteParams) {
    return http.delete(`/produtos/`, {
      params: {
        idProduct,
      },
    })
  },
}
