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
  async getAll() {
    const params = {}

    return await http.get('/fornecedores/', {
      params,
    })
  },

  async create({ name, cnpj, phone, email }: CreateParams) {
    const body = {
      name,
      cnpj,
      phone,
      email,
    }

    return await http.post('/fornecedores', {
      ...body,
    })
  },

  async update({ name, cnpj, phone, email, supplierId }: UpdateParams) {
    const body = {
      name,
      cnpj,
      phone,
      email,
    }

    return await http.put(`/fornecedores/${supplierId}`, {
      ...body,
    })
  },

  async delete({ idSupplier }: DeleteParams) {
    return await http.delete(`/fornecedores/${idSupplier}`)
  },
}
