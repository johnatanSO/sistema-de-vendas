import { inject, injectable } from 'tsyringe'
import { ISalesRepository } from '../../../repositories/Sales/ISalesRepository'

@injectable()
export class CancelSaleService {
  salesRepository: ISalesRepository
  constructor(@inject('SalesRepository') salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  async execute(idSale: string): Promise<void> {
    const filters = {
      _id: idSale,
    }

    const updateFields = {
      $set: {
        status: 'canceled',
      },
    }

    await this.salesRepository.update({ filters, updateFields })
  }
}
