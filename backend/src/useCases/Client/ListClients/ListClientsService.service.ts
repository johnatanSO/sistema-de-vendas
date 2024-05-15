import { inject, injectable } from 'tsyringe'
import { Client } from '../../../entities/client'
import { IClientsRepository } from '../../../repositories/Client/IClientsRepository'

interface IRequest {
  userId: string
}

@injectable()
export class ListClientsService {
  clientsRepository: IClientsRepository
  constructor(
    @inject('ClientsRepository') clientsRepository: IClientsRepository,
  ) {
    this.clientsRepository = clientsRepository
  }

  async execute({ userId }: IRequest): Promise<Client[]> {
    const clients = await this.clientsRepository.list({ userId })

    return clients
  }
}
