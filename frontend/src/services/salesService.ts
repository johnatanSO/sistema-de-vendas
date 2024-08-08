import dayjs from 'dayjs'
import http from '../api/http'
import { usersService } from './usersService'
import utc from 'dayjs/plugin/utc'
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

  getAll({ filters: { startDate, endDate, status } }: GetAllParams) {
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

    return http.get('/vendas/', {
      params,
    })
  },

  create({ newSaleData, totalValue }: CreateParams) {
    const body = {
      ...newSaleData,
      totalValue,
      userInfo: this.userInfo,
    }

    return http.post('/vendas', {
      ...body,
    })
  },

  update({ saleData, totalValue }: UpdateParams) {
    const body = {
      ...saleData,
      totalValue,
    }

    return http.put('/vendas', {
      ...body,
    })
  },

  cancel({ idSale }: DeleteParams) {
    return http.put(`/vendas/cancelar/`, {
      _id: idSale,
    })
  },
}
