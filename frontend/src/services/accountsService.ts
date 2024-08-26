import {
  CreateAccountDTO,
  DeleteAccountDTO,
  GetAllAccountsDTO,
  UpdateAccountDTO,
  UpdateStatusAccountDTO,
} from '../dtos/AccountDTOS'
import { IHttpClientProvider } from '../providers/HttpClientProvider/IHttpClientProvider'
import { usersService } from './usersService'

export const accountsService = {
  userInfo: usersService.getUserInfo(),

  getAll(
    { filters }: GetAllAccountsDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const params = {
      ...filters,
      userId: this.userInfo?._id,
    }

    return httpClientProvider.get('/contas/', {
      params,
    })
  },

  create(
    { newAccountData }: CreateAccountDTO,
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
    { type, value, _id, category, description }: UpdateAccountDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      type,
      value,
      _id,
      category,
      description,
    }

    return httpClientProvider.put('/contas/', {
      ...body,
    })
  },

  updateStatus(
    { idAccount, status }: UpdateStatusAccountDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.patch(`/contas/updateStatus/${idAccount}`, {
      status,
    })
  },

  delete(
    { idAccount }: DeleteAccountDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.delete(`/contas/`, {
      params: {
        idAccount,
      },
    })
  },
}
