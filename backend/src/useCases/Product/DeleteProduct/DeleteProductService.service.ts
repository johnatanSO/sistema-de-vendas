import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../../repositories/Products/IProductsRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class DeleteProductService {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute(idProduct: string): Promise<void> {
    if (!idProduct) throw new AppError('_id do produto não informado')

    const productNotFound = await this.productsRepository.findById(idProduct)

    if (!productNotFound) throw new AppError('Produto não encontrado')

    await this.productsRepository.delete(idProduct)
  }
}
