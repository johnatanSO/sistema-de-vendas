import { ISalesRepository } from '../repositories/Sales/ISalesRepository'

export class CancelSaleService {
  salesRepository: ISalesRepository
  constructor(salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  execute(idSale: string) {
    this.salesRepository.cancel(idSale)
  }
}
