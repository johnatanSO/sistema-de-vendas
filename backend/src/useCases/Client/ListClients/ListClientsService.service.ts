import { inject, injectable } from 'tsyringe'
import { Client } from '../../../entities/client'
import { IClientsRepository } from '../../../repositories/Client/IClientsRepository'

interface IRequest {
  userId: string
  searchString: string | null
}

@injectable()
export class ListClientsService {
  clientsRepository: IClientsRepository
  constructor(
    @inject('ClientsRepository') clientsRepository: IClientsRepository,
  ) {
    this.clientsRepository = clientsRepository
  }

  async execute({ userId, searchString }: IRequest): Promise<Client[]> {
    const clients = await this.clientsRepository.list({ userId, searchString })

    return clients
  }
}
