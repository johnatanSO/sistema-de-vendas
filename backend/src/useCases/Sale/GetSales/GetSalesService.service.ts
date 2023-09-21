import { inject, injectable } from 'tsyringe'
import {
  ISalesRepository,
  Sale,
} from '../../../repositories/Sales/ISalesRepository'

interface IRequest {
  startDate: string
  endDate: string
  userId: string
  status: string
}

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
    status,
  }: IRequest): Promise<Sale[]> {
    const sales = this.salesRepository.list({
      startDate,
      endDate,
      userId,
      status,
    })

    return sales
  }
}
