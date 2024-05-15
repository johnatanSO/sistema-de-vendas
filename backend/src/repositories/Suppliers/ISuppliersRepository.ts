import { Supplier } from '../../entities/supplier'

export interface INewSupplierDTO {
  name: string
  email: string
  cnpj: string
  code: string
  phone: string
  userId: string
}

export interface IListSuppliersDTO {
  userId: string
}

export interface ISuppliersRepository {
  create({
    name,
    cnpj,
    email,
    code,
    userId,
  }: INewSupplierDTO): Promise<Supplier>
  list({ userId }: IListSuppliersDTO): Promise<Supplier[]>
  getEntries(userId: string): Promise<number>
  delete(supplierId: string): Promise<void>
  findByPhone(phone: string): Promise<Supplier>
  findByCnpj(phone: string): Promise<Supplier>
}
