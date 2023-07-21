import {
  IProductsRepository,
  Product,
} from './../repositories/Products/IProductsRepository'

export class UpdateNewProductService {
  productsRepository: IProductsRepository
  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(productData: Product): Promise<any> {
    const productNotFound = await this.productsRepository.findById(
      productData?._id,
    )

    if (!productNotFound) {
      throw new Error('Produto não encontrado')
    }

    const updatedProduct = await this.productsRepository.update(productData)
    return updatedProduct
  }
}
