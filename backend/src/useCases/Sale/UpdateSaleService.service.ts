import { inject, injectable } from 'tsyringe'
import {
  ISalesRepository,
  Sale,
} from '../../repositories/Sales/ISalesRepository'

@injectable()
export class UpdateNewSaleService {
  salesRepository: ISalesRepository
  constructor(@inject('SalesRepository') salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  async execute(saleData: Sale): Promise<any> {
    const saleNotFound = await this.salesRepository.findById(saleData?._id)

    if (!saleNotFound) {
      throw new Error('Venda não encontrada')
    }

    const updatedSale = await this.salesRepository.update(saleData)
    return updatedSale
  }
}
