import {
  IProductsRepository,
  Product,
} from '../repositories/Products/IProductsRepository'

export class UpdateProductsStock {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(products: Product[]) {
    for (const product of products) {
      this.productsRepository.updateStock(product)
    }
  }
}
