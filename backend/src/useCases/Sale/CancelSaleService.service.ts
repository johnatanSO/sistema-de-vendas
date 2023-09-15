import { inject, injectable } from 'tsyringe'
import { ISalesRepository } from '../../repositories/Sales/ISalesRepository'

@injectable()
export class CancelSaleService {
  salesRepository: ISalesRepository
  constructor(@inject('SalesRepository') salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  execute(idSale: string) {
    this.salesRepository.cancel(idSale)
  }
}
