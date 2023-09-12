import { container } from 'tsyringe'
import { ISalesRepository } from '../../repositories/Sales/ISalesRepository'
import { SalesRepository } from '../../repositories/Sales/SalesRepository'

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository,
)
