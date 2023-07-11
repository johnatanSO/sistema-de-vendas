import dayjs from 'dayjs'
import http from '../api/http'

interface GetAllParams {
  filters: any
}

interface CreateParams {
  newSaleData: any
}

interface UpdateParams {
  saleData: any
}

interface DeleteParams {
  idSale: string
}

export const salesService = {
  async getAll({ filters }: GetAllParams) {
    const params = {
      ...(filters?.startDate
        ? { startDate: filters?.startDate }
        : { startDate: dayjs().startOf('month').toISOString() }),
      ...(filters?.endDate
        ? { endDate: filters?.endDate }
        : { endDate: dayjs().endOf('month').toISOString() }),
    }
    return await http.get('/vendas/', {
      params,
    })
  },

  async create({ newSaleData }: CreateParams) {
    const body = {
      ...newSaleData,
    }

    return await http.post('/vendas', {
      ...body,
    })
  },

  async update({ saleData }: UpdateParams) {
    const body = {
      ...saleData,
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
