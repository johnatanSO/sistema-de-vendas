import { Model } from 'mongoose'
import { Client, ClientModel } from '../../entities/client'
import {
  IListClientsDTO,
  INewClientDTO,
  IClientsRepository,
} from './IClientsRepository'

export class ClientsRepository implements IClientsRepository {
  model: Model<Client> = ClientModel

  async create({
    name,
    cpf,
    phone,
    email,
    code,
    userId,
  }: INewClientDTO): Promise<Client> {
    const newClient = await this.model.create({
      name,
      cpf,
      email,
      code,
      phone,
      user: userId,
    })

    await newClient.save()

    return newClient
  }

  async list({ userId }: IListClientsDTO): Promise<Client[]> {
    const clients = await this.model.find({ user: userId })

    return clients
  }

  async getEntries(userId: string): Promise<number> {
    const suppliersAmount = await this.model.countDocuments({ user: userId })

    return suppliersAmount
  }

  async delete(supplieId: string): Promise<void> {
    await this.model.deleteOne({ _id: supplieId })
  }

  async findByCpf(cpf: string): Promise<Client> {
    const supplier = await this.model.findOne({ cpf })

    return supplier
  }

  async findByPhone(phone: string): Promise<Client> {
    const supplier = await this.model.findOne({ phone })

    return supplier
  }
}
