import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../../repositories/Products/IProductsRepository'
import { ProductInSale } from '../../../entities/sale'

interface IRequest {
  products: ProductInSale[]
}

@injectable()
export class UpdateProductsStock {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute({ products }: IRequest): Promise<void> {
    for (const product of products) {
      const filters = {
        _id: product._id,
      }

      const updateFields = {
        $inc: {
          stock: -Number(product.amount),
        },
      }

      await this.productsRepository.update({ filters, updateFields })
    }
  }
}
