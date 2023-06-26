import { IProductsRepository } from './../repositories/Products/IProductsRepository'
import { Product } from '../repositories/Products/IProductsRepository'

export class CreateNewProductService {
  productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ name, value, stock }: Product): Promise<Product> {
    const alreadExistProduct = await this.productsRepository.findByName(name)

    if (alreadExistProduct) {
      throw new Error('Já existe um produto com esse nome')
    }

    const newProduct = this.productsRepository.create({
      name,
      value,
      stock,
    })

    return newProduct
  }
}
