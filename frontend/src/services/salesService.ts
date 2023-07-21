import dayjs from 'dayjs'
import http from '../api/http'
import { usersService } from './usersService'

interface GetAllParams {
  filters: any
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
  async getAll({ filters }: GetAllParams) {
    const userInfo = await usersService.getUserInfo()
    const params = {
      ...(filters?.startDate
        ? { startDate: filters?.startDate }
        : { startDate: dayjs().startOf('month').toISOString() }),
      ...(filters?.endDate
        ? { endDate: filters?.endDate }
        : { endDate: dayjs().endOf('month').toISOString() }),
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
