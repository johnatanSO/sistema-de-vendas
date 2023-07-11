import http from '../api/http'

interface GetAllParams {
  filters: any
}

interface CreateParams {
  newPoductData: any
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

  async create({ newPoductData }: CreateParams) {
    const body = {
      ...newPoductData,
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
