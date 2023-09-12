import { inject, injectable } from 'tsyringe'
import {
  ISalesRepository,
  Sale,
  FiltersGetSales,
} from '../../repositories/Sales/ISalesRepository'

@injectable()
export class GetSalesService {
  salesRepository: ISalesRepository
  constructor(@inject('SalesRepository') salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  async execute({
    startDate,
    endDate,
    userId,
  }: FiltersGetSales): Promise<Sale[]> {
    const sales = this.salesRepository.list({ startDate, endDate, userId })

    return sales
  }
}
