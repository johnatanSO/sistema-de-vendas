import http from '../api/http'

interface CreateParams {
  name: string
  cpf: string
  phone: string
  email: string
}

interface UpdateParams {
  clientData: any
}

interface DeleteParams {
  idClient: string
}

export const clientsService = {
  async getAll() {
    const params = {}
    return await http.get('/clientes/', {
      params,
    })
  },

  async create({ name, cpf, phone, email }: CreateParams) {
    const body = {
      name,
      cpf,
      phone,
      email,
    }

    return await http.post('/clientes', {
      ...body,
    })
  },

  async update({ clientData }: UpdateParams) {
    const body = {
      ...clientData,
    }

    return await http.put('/clientes/', {
      ...body,
    })
  },

  async delete({ idClient }: DeleteParams) {
    return await http.delete(`/clientes/`, {
      params: {
        idClient,
      },
    })
  },
}
