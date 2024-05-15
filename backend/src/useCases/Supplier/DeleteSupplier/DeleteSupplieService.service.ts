import { inject, injectable } from 'tsyringe'
import { ISuppliersRepository } from '../../../repositories/Suppliers/ISuppliersRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
export class DeleteSupplierService {
  suppliersRepository: ISuppliersRepository
  constructor(
    @inject('SuppliersRepository') suppliersRepository: ISuppliersRepository,
  ) {
    this.suppliersRepository = suppliersRepository
  }

  async execute(supplierId: string): Promise<void> {
    if (!supplierId) throw new AppError('_id do fornecedor não informado')

    await this.suppliersRepository.delete(supplierId)
  }
}
