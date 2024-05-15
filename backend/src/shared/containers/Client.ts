import { ClientsRepository } from './../../repositories/Client/ClientsRepository'
import { IClientsRepository } from './../../repositories/Client/IClientsRepository'
import { container } from 'tsyringe'

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
)
