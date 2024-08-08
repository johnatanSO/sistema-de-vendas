import http from '../api/http'
import { usersService } from './usersService'

interface GetPaymentTypesParams {
  filters: any
}

export const dashboardService = {
  userInfo: usersService.getUserInfo(),

  getPaymentTypes({ filters }: GetPaymentTypesParams) {
    const params = {
      ...filters,
      userId: this.userInfo._id,
    }

    return http.get('/dashboard/formasDePagamento/', {
      params,
    })
  },
}
