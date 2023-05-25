import http from '../api/http'

export const dashboardService = {
  async getPaymentTypes(filters: any) {
    const params = {
      ...filters,
    }
    return await http.get('/dashboard/formasDePagamento/', {
      params,
    })
  },
}
