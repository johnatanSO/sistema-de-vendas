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
    value: string | number
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
  userInfo: usersService.getUserInfo(),

  getAll({ filters }: GetAllParams) {
    const params = {
      ...filters,
      userId: this.userInfo._id,
    }

    return http.get('/contas/', {
      params,
    })
  },

  create({ newAccountData }: CreateParams) {
    const body = {
      ...newAccountData,
      value: Number(newAccountData?.value),
      userInfo: this.userInfo,
    }

    return http.post('/contas/', {
      ...body,
    })
  },

  update({ accountData }: UpdateParams) {
    const body = {
      ...accountData,
    }

    return http.put('/contas/', {
      ...body,
    })
  },

  updateStatus({ idAccount, status }: UpdateStatusParams) {
    return http.patch(`/contas/updateStatus/${idAccount}`, {
      status,
    })
  },

  delete({ idAccount }: DeleteParams) {
    return http.delete(`/contas/`, {
      params: {
        idAccount,
      },
    })
  },
}
