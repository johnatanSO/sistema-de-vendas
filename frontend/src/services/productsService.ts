import http from '../api/http'

export const productsService = {
  async getAll(filters: any) {
    const params = {
      ...filters,
    }
    return await http.get('/produtos/', {
      params,
    })
  },

  async create(newPoductData: any) {
    const body = {
      ...newPoductData,
    }

    return await http.post('/produtos', {
      ...body,
    })
  },

  async update(productData: any) {
    const body = {
      ...productData,
    }

    return await http.put('/produtos/', {
      ...body,
    })
  },

  async delete(idProduct: string) {
    return await http.delete(`/produtos/${idProduct}`)
  },
}
