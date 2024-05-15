import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../errors/AppError'
import { IClientsRepository } from '../../../repositories/Client/IClientsRepository'
import { Client } from '../../../entities/client'

interface IRequest {
  name: string
  phone: string
  cpf: string
  email: string
  userId: string
}

@injectable()
export class CreateNewClientService {
  clientsRepository: IClientsRepository
  constructor(
    @inject('ClientsRepository') clientsRepository: IClientsRepository,
  ) {
    this.clientsRepository = clientsRepository
  }

  async execute({
    name,
    email,
    cpf,
    phone,
    userId,
  }: IRequest): Promise<Client> {
    if (!name) throw new AppError('Nome do cliente não informado')
    if (!phone) throw new AppError('Telefone do cliente não informado')

    const phoneAlreadyExists = await this.clientsRepository.findByPhone(phone)
    if (phoneAlreadyExists) {
      throw new AppError('Já existe um cliente cadastrado com este telefone')
    }

    const cnpjAlreadyExists = await this.clientsRepository.findByCpf(cpf)
    if (cnpjAlreadyExists) {
      throw new AppError('Já existe um cliente cadastrado com este CPF')
    }

    const clientsAmount = await this.clientsRepository.getEntries(userId)
    const code = (clientsAmount + 1).toString()

    const newClient = await this.clientsRepository.create({
      name,
      phone,
      cpf,
      email,
      code,
      userId,
    })

    return newClient
  }
}
