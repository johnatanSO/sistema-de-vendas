import { inject, injectable } from 'tsyringe'
import { ISalesRepository } from '../../../repositories/Sales/ISalesRepository'
import { AppError } from '../../../errors/AppError'
import { ProductInSale } from '../../../entities/sale'

interface IRequest {
  idSale: string
  client: string
  products: ProductInSale[]
  paymentType: string
  totalValue: number
  status: string
}

@injectable()
export class UpdateNewSaleService {
  salesRepository: ISalesRepository
  constructor(@inject('SalesRepository') salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  async execute({
    idSale,
    client,
    products,
    paymentType,
    totalValue,
    status,
  }: IRequest): Promise<void> {
    if (!idSale) throw new AppError('_id da venda não foi informado')

    const saleNotFound = await this.salesRepository.findById(idSale)

    if (!saleNotFound) throw new AppError('Venda não encontrada')

    const filters = {
      _id: idSale,
    }

    const updateFields = {
      client,
      products,
      paymentType,
      totalValue,
      status,
    }

    const updatedSale = await this.salesRepository.update({
      filters,
      updateFields,
    })

    return updatedSale
  }
}
