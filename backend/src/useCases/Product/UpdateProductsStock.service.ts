import { inject, injectable } from 'tsyringe'
import {
  IProductsRepository,
  Product,
} from '../../repositories/Products/IProductsRepository'

@injectable()
export class UpdateProductsStock {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute(products: Product[]) {
    for (const product of products) {
      this.productsRepository.updateStock(product)
    }
  }
}
