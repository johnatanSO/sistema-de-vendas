import { IHttpClientProvider } from './../providers/HttpClientProvider/IHttpClientProvider'
interface CreateParams {
  name: string
  cnpj: string
  phone: string
  email: string
}

interface UpdateParams {
  name: string
  cnpj: string
  phone: string
  email: string
  supplierId: string
}

interface DeleteParams {
  idSupplier: string
}

export const suppliersService = {
  getAll(httpClientProvider: IHttpClientProvider) {
    const params = {}

    return httpClientProvider.get('/fornecedores/', {
      params,
    })
  },

  create(
    { name, cnpj, phone, email }: CreateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      name,
      cnpj,
      phone,
      email,
    }

    return httpClientProvider.post('/fornecedores', {
      ...body,
    })
  },

  update(
    { name, cnpj, phone, email, supplierId }: UpdateParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    const body = {
      name,
      cnpj,
      phone,
      email,
    }

    return httpClientProvider.put(`/fornecedores/${supplierId}`, {
      ...body,
    })
  },

  delete(
    { idSupplier }: DeleteParams,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.delete(`/fornecedores/${idSupplier}`)
  },
}
