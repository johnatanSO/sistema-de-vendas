import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'
import { usersService } from './usersService'

interface GetAllParams {
  filters: any
}

interface CreateParams {
  newAccountData: {
    value: number | string
  }
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

  getAll({ filters }: GetAllParams, httpClientProvider: IHttpClientProvider) {
    const params = {
      ...filters,
      userId: this.userInfo?._id,
    }

    return httpClientProvider.get('/contas/', {
      params,
    })
  },

  create(
    { newAccountData }: CreateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      ...newAccountData,
      value: Number(newAccountData?.value),
      userInfo: this.userInfo,
    }

    return httpClientProvider.post('/contas/', {
      ...body,
    })
  },

  update(
    { accountData }: UpdateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      ...accountData,
    }

    return httpClientProvider.put('/contas/', {
      ...body,
    })
  },

  updateStatus(
    { idAccount, status }: UpdateStatusParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.patch(`/contas/updateStatus/${idAccount}`, {
      status,
    })
  },

  delete({ idAccount }: DeleteParams, httpClientProvider: IHttpClientProvider) {
    return httpClientProvider.delete(`/contas/`, {
      params: {
        idAccount,
      },
    })
  },
}
