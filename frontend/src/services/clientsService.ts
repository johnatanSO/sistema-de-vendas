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
  clientId: string
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
    { name, cpf, phone, email, clientId }: UpdateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      name,
      cpf,
      phone,
      email,
    }

    return httpClientProvider.put(`/clientes/${clientId}`, {
      ...body,
    })
  },

  delete({ idClient }: DeleteParams, httpClientProvider: IHttpClientProvider) {
    return httpClientProvider.delete(`/clientes/${idClient}`)
  },
}
