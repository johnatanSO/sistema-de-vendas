import http from '../api/http'
import { NewProductData } from '../screens/Products/ModalCreateNewProduct'
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
  async getAll({ filters }: GetAllParams) {
    const userInfo = await usersService.getUserInfo()
    const params = {
      ...filters,
      userId: userInfo?._id,
    }
    return await http.get('/produtos/', {
      params,
    })
  },
  async getDefaultProducts() {
    const userInfo = await usersService.getUserInfo()
    const params = {
      userId: userInfo?._id,
    }
    return await http.get('/produtos/padroes/', {
      params,
    })
  },

  async create({ newProductData }: CreateParams) {
    const userInfo = await usersService.getUserInfo()
    const body = {
      ...newProductData,
      stock: Number(newProductData?.stock),
      value: Number(newProductData?.value),
      userInfo,
    }

    return await http.post('/produtos', {
      ...body,
    })
  },

  async update({ productData }: UpdateParams) {
    const body = {
      ...productData,
    }

    return await http.put('/produtos/', {
      ...body,
    })
  },

  async delete({ idProduct }: DeleteParams) {
    return await http.delete(`/produtos/`, {
      params: {
        idProduct,
      },
    })
  },
}
