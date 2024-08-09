import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../../repositories/Products/IProductsRepository'
import { Product } from '../../../entities/product'

interface IRequest {
  userId: string
  searchString: string
}

@injectable()
export class ListProductsService {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute({ userId, searchString }: IRequest): Promise<Product[]> {
    const queryList = {
      ...(searchString
        ? { name: { $regex: searchString, $options: 'i' } }
        : {}),
    }

    const products = await this.productsRepository.list({
      userId,
      ...queryList,
    })

    return products
  }
}
