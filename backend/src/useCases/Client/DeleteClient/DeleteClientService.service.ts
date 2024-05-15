import { IClientsRepository } from './../../../repositories/Client/IClientsRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../errors/AppError'

@injectable()
export class DeleteClientService {
  clientsRepository: IClientsRepository
  constructor(
    @inject('ClientsRepository') clientsRepository: IClientsRepository,
  ) {
    this.clientsRepository = clientsRepository
  }

  async execute(clientsId: string): Promise<void> {
    if (!clientsId) throw new AppError('_id do cliente não informado')

    await this.clientsRepository.delete(clientsId)
  }
}
