import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../../repositories/Products/IProductsRepository'
import { Product } from '../../../entities/product'

interface IRequest {
  userId: string
}

@injectable()
export class ListDefaultProductsService {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute({ userId }: IRequest): Promise<Product[]> {
    const products = await this.productsRepository.list({
      userId,
      searchString: null,
      onlyDefault: true,
    })

    return products
  }
}
