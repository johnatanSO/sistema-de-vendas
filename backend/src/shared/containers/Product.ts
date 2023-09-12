import { container } from 'tsyringe'
import { ProductsRepository } from '../../repositories/Products/ProductsRepository'
import { IProductsRepository } from '../../repositories/Products/IProductsRepository'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
)
