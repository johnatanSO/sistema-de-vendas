import { IProductsRepository } from './../repositories/Products/IProductsRepository'

export class DeleteProductService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(idProduct: string) {
    const productNotFound = await this.productsRepository.findById(idProduct)

    if (!productNotFound) {
      throw new Error('Produto não encontrado')
    }
    await this.productsRepository.delete(idProduct)
  }
}
