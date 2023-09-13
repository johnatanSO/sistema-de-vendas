import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../repositories/Products/IProductsRepository'

@injectable()
export class DeleteProductService {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute(idProduct: any) {
    const productNotFound = await this.productsRepository.findById(idProduct)

    if (!productNotFound) {
      throw new Error('Produto não encontrado')
    }
    await this.productsRepository.delete(idProduct)
  }
}
