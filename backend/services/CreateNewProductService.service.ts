import { IProductsRepository } from './../repositories/Products/IProductsRepository'
import { Product } from '../repositories/Products/IProductsRepository'

export class CreateNewProductService {
  productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({
    name,
    value,
    stock,
    isDefault,
    userId,
  }: Product): Promise<Product> {
    const alreadExistProduct = await this.productsRepository.findByName(name)

    if (alreadExistProduct) {
      throw new Error('Já existe um produto com esse nome')
    }

    if (!name) {
      throw new Error('Nenhum nome foi informado par ao produto')
    }

    const productsAmount = await this.productsRepository.getEntries(userId)
    const code = (productsAmount + 1).toString()

    const newProduct = this.productsRepository.create({
      code,
      name,
      value,
      stock,
      userId,
      isDefault,
    })

    return newProduct
  }
}
