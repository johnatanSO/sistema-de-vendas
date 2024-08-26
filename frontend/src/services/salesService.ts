import dayjs from 'dayjs'
import { usersService } from './usersService'
import utc from 'dayjs/plugin/utc'
import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'
import {
  CreateSaleDTO,
  DeleteSaleDTO,
  GetAllSalesDTO,
  UpdateSaleDTO,
} from '../dtos/SalesDTOS'
dayjs.extend(utc)

export const salesService = {
  userInfo: usersService.getUserInfo(),

  getAll(
    { filters: { startDate, endDate, status } }: GetAllSalesDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const params = {
      ...(status ? { status } : {}),
      ...(startDate
        ? { startDate }
        : { startDate: dayjs.utc().startOf('month').toISOString() }),
      ...(endDate
        ? { endDate }
        : { endDate: dayjs.utc().endOf('month').toISOString() }),
      userId: this.userInfo?._id,
    }

    return httpClientProvider.get('/vendas/', {
      params,
    })
  },

  create(
    { newSaleData, totalValue }: CreateSaleDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      ...newSaleData,
      totalValue,
      userInfo: this.userInfo,
    }

    return httpClientProvider.post('/vendas', {
      ...body,
    })
  },

  update(
    { saleData, totalValue }: UpdateSaleDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      ...saleData,
      totalValue,
    }

    return httpClientProvider.put('/vendas', {
      ...body,
    })
  },

  cancel({ idSale }: DeleteSaleDTO, httpClientProvider: IHttpClientProvider) {
    return httpClientProvider.put(`/vendas/cancelar/`, {
      _id: idSale,
    })
  },
}
