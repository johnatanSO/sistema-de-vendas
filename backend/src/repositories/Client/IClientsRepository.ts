import { Client } from '../../entities/client'

export interface INewClientDTO {
  name: string
  email: string
  cpf: string
  code: string
  phone: string
  userId: string
}

export interface IUpdateClientDTO {
  name: string
  phone: string
  email: string
  cpf: string
}

export interface IListClientsDTO {
  userId: string
  searchString: string
}

export interface IClientsRepository {
  create({ name, cpf, email, code, userId }: INewClientDTO): Promise<Client>
  list({ userId }: IListClientsDTO): Promise<Client[]>
  getEntries(userId: string): Promise<number>
  delete(clientId: string): Promise<void>
  findByPhone(phone: string): Promise<Client>
  findByCpf(phone: string): Promise<Client>
  update(clientId: string, fieldsToUpdate: IUpdateClientDTO): Promise<void>
}
