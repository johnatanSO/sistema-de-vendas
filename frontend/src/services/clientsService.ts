import {
  CreateClientDTO,
  DeleteClientDTO,
  UpdateClientDTO,
} from '../dtos/ClientDTOS'
import { IHttpClientProvider } from './../providers/HttpClientProvider/IHttpClientProvider'

export const clientsService = {
  getAll(httpClientProvider: IHttpClientProvider) {
    const params = {}

    return httpClientProvider.get('/clientes/', {
      params,
    })
  },

  create(
    { name, cpf, phone, email }: CreateClientDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      name,
      cpf,
      phone,
      email,
    }

    return httpClientProvider.post('/clientes', {
      ...body,
    })
  },

  update(
    { _id: idClient, name, email, phone, cpf }: UpdateClientDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      name,
      phone,
      email,
      cpf,
    }

    return httpClientProvider.put(`/clientes/${idClient}`, {
      ...body,
    })
  },

  delete(
    { idClient }: DeleteClientDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.delete(`/clientes/${idClient}`)
  },
}
