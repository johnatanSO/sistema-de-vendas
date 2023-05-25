import http from '../api/http'

export const salesService = {
  async getAll(filters: any) {
    const params = {
      ...filters,
    }
    return await http.get('/vendas/', {
      params,
    })
  },

  async create(newSaleData: any) {
    const body = {
      ...newSaleData,
    }

    return await http.post('/vendas', {
      ...body,
    })
  },

  async update(saleData: any) {
    const body = {
      ...saleData,
    }

    return await http.put('/vendas', {
      ...body,
    })
  },

  async delete(idSale: string) {
    return await http.delete(`/vendas/${idSale}`)
  },
}
