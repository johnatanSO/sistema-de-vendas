import { inject, injectable } from 'tsyringe'
import { Supplier } from '../../../entities/supplier'
import { ISuppliersRepository } from '../../../repositories/Suppliers/ISuppliersRepository'

interface IRequest {
  name: string
  phone: string
  cnpj: string
  email: string
  userId: string
}

@injectable()
export class CreateNewSupplierService {
  suppliersRepository: ISuppliersRepository
  constructor(
    @inject('SuppliersRepository') suppliersRepository: ISuppliersRepository,
  ) {
    this.suppliersRepository = suppliersRepository
  }

  async execute({
    name,
    email,
    cnpj,
    phone,
    userId,
  }: IRequest): Promise<Supplier> {
    const suppliersAmount = await this.suppliersRepository.getEntries(userId)
    const code = (suppliersAmount + 1).toString()

    const newSupplier = await this.suppliersRepository.create({
      name,
      phone,
      cnpj,
      email,
      code,
      userId,
    })

    return newSupplier
  }
}
