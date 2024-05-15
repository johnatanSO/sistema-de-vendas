import { Model } from 'mongoose'
import { Supplier, SupplierModel } from '../../entities/supplier'
import {
  IListSuppliersDTO,
  INewSupplierDTO,
  ISuppliersRepository,
} from './ISuppliersRepository'

export class SuppliersRepository implements ISuppliersRepository {
  model: Model<Supplier> = SupplierModel

  async create({
    name,
    cnpj,
    phone,
    email,
    code,
    userId,
  }: INewSupplierDTO): Promise<Supplier> {
    const newSupplier = await this.model.create({
      name,
      cnpj,
      email,
      code,
      phone,
      userId,
    })

    await newSupplier.save()

    return newSupplier
  }

  async list({ userId }: IListSuppliersDTO): Promise<Supplier[]> {
    const suppliers = await this.model.find({ userId })

    return suppliers
  }

  async getEntries(userId: string): Promise<number> {
    const suppliersAmount = await this.model.countDocuments({ userId })

    return suppliersAmount
  }
}
