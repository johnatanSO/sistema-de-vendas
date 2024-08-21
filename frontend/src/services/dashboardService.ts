import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'
import { usersService } from './usersService'

interface GetPaymentTypesParams {
  filters: any
}

export const dashboardService = {
  userInfo: usersService.getUserInfo(),

  getPaymentTypes(
    { filters }: GetPaymentTypesParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const params = {
      ...filters,
      userId: this.userInfo?._id,
    }

    return httpClientProvider.get('/dashboard/formasDePagamento/', {
      params,
    })
  },
}
