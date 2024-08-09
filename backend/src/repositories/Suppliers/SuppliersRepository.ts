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
      user: userId,
    })

    await newSupplier.save()

    return newSupplier
  }

  async list({ userId }: IListSuppliersDTO): Promise<Supplier[]> {
    const suppliers = await this.model.find({ user: userId }).lean()

    return suppliers
  }

  async getEntries(userId: string): Promise<number> {
    return await this.model.countDocuments({ user: userId }).lean()
  }

  async delete(supplierId: string): Promise<void> {
    await this.model.deleteOne({ _id: supplierId })
  }

  async findByCnpj(cnpj: string): Promise<Supplier> {
    const supplier = await this.model.findOne({ cnpj }).lean()

    return supplier
  }

  async findByPhone(phone: string): Promise<Supplier> {
    const supplier = await this.model.findOne({ phone }).lean()

    return supplier
  }
}
