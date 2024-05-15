import { container } from 'tsyringe'
import { ISuppliersRepository } from '../../repositories/Suppliers/ISuppliersRepository'
import { SuppliersRepository } from '../../repositories/Suppliers/SuppliersRepository'

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
)
