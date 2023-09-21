import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../../repositories/Products/IProductsRepository'
import { Product } from '../../../entities/product'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  name: string
  value: number
  stock: number
  isDefault: boolean
  userId: string
}

@injectable()
export class CreateNewProductService {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute({
    name,
    value,
    stock,
    isDefault,
    userId,
  }: IRequest): Promise<Product> {
    const alreadExistProduct = await this.productsRepository.findByName(name)

    if (alreadExistProduct)
      throw new AppError('Já existe um produto com esse nome')

    if (!name) throw new AppError('Nenhum nome foi informado par ao produto')

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
