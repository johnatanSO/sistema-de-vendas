export interface CreateClientDTO {
  name: string
  cpf: string
  phone: string
  email: string
}

export interface UpdateClientDTO {
  name: string
  cpf: string
  phone: string
  email: string
  _id: string
}

export interface DeleteClientDTO {
  idClient: string
}

export interface GetAllClientsDTO {
  searchString: string | null
}
