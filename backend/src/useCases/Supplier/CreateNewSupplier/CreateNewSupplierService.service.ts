import { inject, injectable } from 'tsyringe'
import { Supplier } from '../../../entities/supplier'
import { ISuppliersRepository } from '../../../repositories/Suppliers/ISuppliersRepository'
import { AppError } from '../../../errors/AppError'

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
    if (!name) throw new AppError('Nome do fornecedor não informado')
    if (!phone) throw new AppError('Telefone do fornecedor não informado')

    const phoneAlreadyExists = await this.suppliersRepository.findByPhone(phone)
    if (phoneAlreadyExists) {
      throw new AppError('Já existe um fornecedor cadastrado com este telefone')
    }

    const cnpjAlreadyExists = await this.suppliersRepository.findByCnpj(cnpj)
    if (cnpjAlreadyExists) {
      throw new AppError('Já existe um fornecedor cadastrado com este CNPJ')
    }

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
