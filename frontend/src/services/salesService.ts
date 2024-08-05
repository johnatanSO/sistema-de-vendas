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
  async getAll({ filters: { startDate, endDate, status } }: GetAllParams) {
    const userInfo = await usersService.getUserInfo()

    const params = {
      ...(status ? { status } : {}),
      ...(startDate
        ? { startDate }
        : { startDate: dayjs.utc().startOf('month').toISOString() }),
      ...(endDate
        ? { endDate }
        : { endDate: dayjs.utc().endOf('month').toISOString() }),
      userId: userInfo?._id,
    }

    return await http.get('/vendas/', {
      params,
    })
  },

  async create({ newSaleData, totalValue }: CreateParams) {
    const userInfo = await usersService.getUserInfo()

    const body = {
      ...newSaleData,
      totalValue,
      userInfo,
    }

    return await http.post('/vendas', {
      ...body,
    })
  },

  async update({ saleData, totalValue }: UpdateParams) {
    const body = {
      ...saleData,
      totalValue,
    }

    return await http.put('/vendas', {
      ...body,
    })
  },

  async cancel({ idSale }: DeleteParams) {
    return await http.put(`/vendas/cancelar/`, {
      _id: idSale,
    })
  },
}
