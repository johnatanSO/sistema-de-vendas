import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../../../repositories/Products/IProductsRepository'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  idProduct: string
  name: string
  value: number
  stock: number
  isDefault: boolean
}

@injectable()
export class UpdateNewProductService {
  productsRepository: IProductsRepository
  constructor(
    @inject('ProductsRepository') productsRepository: IProductsRepository,
  ) {
    this.productsRepository = productsRepository
  }

  async execute({
    idProduct,
    name,
    value,
    stock,
    isDefault,
  }: IRequest): Promise<void> {
    if (!idProduct) throw new AppError('_id do produto não informado')

    const productNotFound = await this.productsRepository.findById(idProduct)

    if (!productNotFound) throw new AppError('Produto inválido')

    const filters = {
      _id: idProduct,
    }

    const updateFields = {
      name,
      value,
      stock,
      isDefault,
    }

    const updatedProduct = await this.productsRepository.update({
      filters,
      updateFields,
    })

    return updatedProduct
  }
}
