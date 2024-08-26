import {
  CreateSupplierDTO,
  DeleteSupplierDTO,
  UpdateSupplierDTO,
} from '../dtos/SupplierDTOS'
import { IHttpClientProvider } from './../providers/HttpClientProvider/IHttpClientProvider'

export const suppliersService = {
  getAll(httpClientProvider: IHttpClientProvider) {
    const params = {}

    return httpClientProvider.get('/fornecedores/', {
      params,
    })
  },

  create(
    { name, cnpj, phone, email }: CreateSupplierDTO,
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
    { name, cnpj, phone, email, _id: supplierId }: UpdateSupplierDTO,
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
    { idSupplier }: DeleteSupplierDTO,
    httpClientProvider: IHttpClientProvider,
  ) {
    return httpClientProvider.delete(`/fornecedores/${idSupplier}`)
  },
}
