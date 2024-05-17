import { inject, injectable } from 'tsyringe'
import { IClientsRepository } from '../../../repositories/Client/IClientsRepository'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  name: string
  phone: string
  email: string
  cpf: string
  clientId: string
}

@injectable()
export class UpdateClientService {
  clientsRepository: IClientsRepository
  constructor(
    @inject('ClientsRepository') clientsRepository: IClientsRepository,
  ) {
    this.clientsRepository = clientsRepository
  }

  async execute({
    name,
    phone,
    email,
    cpf,
    clientId,
  }: IRequest): Promise<void> {
    if (!clientId) throw new AppError('ID do cliente não foi informado')

    await this.clientsRepository.update(clientId, {
      name,
      phone,
      email,
      cpf,
    })
  }
}
