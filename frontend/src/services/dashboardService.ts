import http from '../api/http'
import { usersService } from './usersService'

interface GetPaymentTypesParams {
  filters: any
}

export const dashboardService = {
  async getPaymentTypes({ filters }: GetPaymentTypesParams) {
    const userInfo = await usersService.getUserInfo()
    const params = {
      ...filters,
      userId: userInfo?._id,
    }
    return await http.get('/dashboard/formasDePagamento/', {
      params,
    })
  },
}
