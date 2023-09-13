import { inject, injectable } from 'tsyringe'
import {
  ISalesRepository,
  Sale,
} from '../../repositories/Sales/ISalesRepository'

@injectable()
export class CreateNewSaleService {
  salesRepository: ISalesRepository
  constructor(@inject('SalesRepository') salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  async execute({
    client,
    products,
    paymentType,
    totalValue,
    userId,
  }: Sale): Promise<Sale> {
    if (!paymentType) throw new Error('Forma de pagamento não informada')
    if (!products || products?.length === 0)
      throw new Error('Nenhum produto selecionado')

    const salesAmount = await this.salesRepository.getEntries(userId)
    const code = (salesAmount + 1).toString()

    const newSale = this.salesRepository.create({
      client,
      products,
      paymentType,
      totalValue,
      userId,
      code,
    })

    return newSale
  }
}
