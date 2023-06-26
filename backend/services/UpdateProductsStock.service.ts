import {
  IProductsRepository,
  Product,
} from '../repositories/Products/IProductsRepository'

export class UpdateProductsStock {
  productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(products: Product[]) {
    for (const product of products) {
      this.productsRepository.updateStock(product)
    }
  }
}
