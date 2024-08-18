import dayjs from 'dayjs'
import { usersService } from './usersService'
import utc from 'dayjs/plugin/utc'
import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'
dayjs.extend(utc)

interface GetAllParams {
  filters: {
    status: string
    startDate: string | Date
    endDate: string | Date
  }
}

interface CreateParams {
  newSaleData: any
  totalValue: number
}

interface UpdateParams {
  saleData: any
  totalValue: number
}

interface DeleteParams {
  idSale: string
}

export const salesService = {
  userInfo: usersService.getUserInfo(),

  getAll(
    { filters: { startDate, endDate, status } }: GetAllParams,
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
      userId: this.userInfo._id,
    }

    return httpClientProvider.get('/vendas/', {
      params,
    })
  },

  create(
    { newSaleData, totalValue }: CreateParams,
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
    { saleData, totalValue }: UpdateParams,
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

  cancel({ idSale }: DeleteParams, httpClientProvider: IHttpClientProvider) {
    return httpClientProvider.put(`/vendas/cancelar/`, {
      _id: idSale,
    })
  },
}
