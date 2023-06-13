import http from '../api/http'

interface GetPaymentTypesParams {
  filters: any
}

export const dashboardService = {
  async getPaymentTypes({ filters }: GetPaymentTypesParams) {
    const params = {
      ...filters,
    }
    return await http.get('/dashboard/formasDePagamento/', {
      params,
    })
  },
}
