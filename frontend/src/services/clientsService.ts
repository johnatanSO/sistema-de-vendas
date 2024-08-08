import http from '../api/http'

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
  getAll() {
    const params = {}

    return http.get('/clientes/', {
      params,
    })
  },

  create({ name, cpf, phone, email }: CreateParams) {
    const body = {
      name,
      cpf,
      phone,
      email,
    }

    return http.post('/clientes', {
      ...body,
    })
  },

  update({ name, cpf, phone, email, clientId }: UpdateParams) {
    const body = {
      name,
      cpf,
      phone,
      email,
    }

    return http.put(`/clientes/${clientId}`, {
      ...body,
    })
  },

  delete({ idClient }: DeleteParams) {
    return http.delete(`/clientes/${idClient}`)
  },
}
