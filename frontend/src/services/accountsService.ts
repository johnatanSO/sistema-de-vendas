import http from '../api/http'
import { NewAccountData } from '../components/screens/Accounts/ModalCreateNewAccount'
import { usersService } from './usersService'

interface GetAllParams {
  filters: any
}

interface CreateParams {
  newAccountData: NewAccountData
}

interface UpdateParams {
  accountData: {
    description: string
    type: string
    category: string
    value: string
  }
}

interface UpdateStatusParams {
  idAccount: string
  status: string
}

interface DeleteParams {
  idAccount: string
}

export const accountsService = {
  async getAll({ filters }: GetAllParams) {
    const userInfo = await usersService.getUserInfo()
    const params = {
      ...filters,
      userId: userInfo?._id,
    }
    return await http.get('/contas/', {
      params,
    })
  },

  async create({ newAccountData }: CreateParams) {
    const userInfo = await usersService.getUserInfo()
    const body = {
      ...newAccountData,
      value: Number(newAccountData?.value),
      userInfo,
    }

    return await http.post('/contas/', {
      ...body,
    })
  },

  async update({ accountData }: UpdateParams) {
    const body = {
      ...accountData,
    }

    return await http.put('/contas/', {
      ...body,
    })
  },

  async updateStatus({ idAccount, status }: UpdateStatusParams) {
    return http.patch(`/contas/updateStatus/${idAccount}`, {
      status,
    })
  },

  async delete({ idAccount }: DeleteParams) {
    return await http.delete(`/contas/`, {
      params: {
        idAccount,
      },
    })
  },
}
