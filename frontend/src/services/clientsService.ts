import { IHttpClientProvider } from './../providers/HttpClientProvider/IHttpClientProvider'

interface CreateParams {
  name: string
  cpf: string
  phone: string
  email: string
}

interface UpdateParams {
  name: string
  cpf: string
  phone: string
  email: string
  _id: string
}

interface DeleteParams {
  idClient: string
}

export const clientsService = {
  getAll(httpClientProvider: IHttpClientProvider) {
    const params = {}

    return httpClientProvider.get('/clientes/', {
      params,
    })
  },

  create(
    { name, cpf, phone, email }: CreateParams,
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
    { _id: idClient, name, email, phone, cpf }: UpdateParams,
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

  delete({ idClient }: DeleteParams, httpClientProvider: IHttpClientProvider) {
    return httpClientProvider.delete(`/clientes/${idClient}`)
  },
}
