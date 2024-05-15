import { inject, injectable } from 'tsyringe'
import { Supplier } from '../../../entities/supplier'
import { ISuppliersRepository } from '../../../repositories/Suppliers/ISuppliersRepository'

interface IRequest {
  userId: string
}

@injectable()
export class ListSuppliersService {
  suppliersRepository: ISuppliersRepository
  constructor(
    @inject('SuppliersRepository') suppliersRepository: ISuppliersRepository,
  ) {
    this.suppliersRepository = suppliersRepository
  }

  async execute({ userId }: IRequest): Promise<Supplier[]> {
    const suppliers = await this.suppliersRepository.list({ userId })

    return suppliers
  }
}
