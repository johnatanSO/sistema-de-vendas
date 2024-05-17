import { inject, injectable } from 'tsyringe'
import { ISalesRepository } from '../../../repositories/Sales/ISalesRepository'
import { ProductInSale, Sale } from '../../../entities/sale'
import { AppError } from '../../../errors/AppError'

interface IRequest {
  clientId: string
  products: ProductInSale[]
  paymentType: string
  totalValue: number
  userId: string
}

@injectable()
export class CreateNewSaleService {
  salesRepository: ISalesRepository
  constructor(@inject('SalesRepository') salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  async execute({
    clientId,
    products,
    paymentType,
    totalValue,
    userId,
  }: IRequest): Promise<Sale> {
    if (!paymentType) throw new AppError('Forma de pagamento não informada')
    if (!products || products?.length === 0)
      throw new AppError('Nenhum produto selecionado')

    const salesAmount = await this.salesRepository.getEntries(userId)
    const code = (salesAmount + 1).toString()

    const newSale = await this.salesRepository.create({
      clientId,
      products,
      paymentType,
      totalValue,
      userId,
      code,
    })

    return newSale
  }
}
