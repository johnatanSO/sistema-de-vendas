import { IProductsRepository } from './../repositories/Products/IProductsRepository'

export class UpdateNewProductService {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({ name, _id, value, stock }: any): Promise<any> {
    const productNotFound = await this.productsRepository.findById(_id)

    if (!productNotFound) {
      throw new Error('Produto não encontrado')
    }

    const updatedProduct = await this.productsRepository.update({
      name,
      _id,
      value,
      stock,
    })
    return updatedProduct
  }
}
