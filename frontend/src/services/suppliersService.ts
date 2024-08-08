import http from '../api/http'

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
  getAll() {
    const params = {}

    return http.get('/fornecedores/', {
      params,
    })
  },

  create({ name, cnpj, phone, email }: CreateParams) {
    const body = {
      name,
      cnpj,
      phone,
      email,
    }

    return http.post('/fornecedores', {
      ...body,
    })
  },

  update({ name, cnpj, phone, email, supplierId }: UpdateParams) {
    const body = {
      name,
      cnpj,
      phone,
      email,
    }

    return http.put(`/fornecedores/${supplierId}`, {
      ...body,
    })
  },

  delete({ idSupplier }: DeleteParams) {
    return http.delete(`/fornecedores/${idSupplier}`)
  },
}
