import http from '../api/http'
import { NewProductData } from '../screens/Products/ModalCreateNewProduct'

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
    const params = {
      ...filters,
    }
    return await http.get('/produtos/', {
      params,
    })
  },

  async create({ newProductData }: CreateParams) {
    const body = {
      ...newProductData,
      stock: Number(newProductData?.stock),
      value: Number(newProductData?.value),
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
