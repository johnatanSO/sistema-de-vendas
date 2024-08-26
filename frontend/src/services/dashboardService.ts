import { GetPaymentTypesDTO } from '../dtos/DashboardDTOS'
import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'
import { usersService } from './usersService'

export const dashboardService = {
  userInfo: usersService.getUserInfo(),

  getPaymentTypes(
    { filters }: GetPaymentTypesDTO,
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
