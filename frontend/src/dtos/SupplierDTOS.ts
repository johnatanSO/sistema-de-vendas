export interface CreateSupplierDTO {
  name: string
  cnpj: string
  phone: string
  email: string
}

export interface UpdateSupplierDTO {
  name: string
  cnpj: string
  phone: string
  email: string
  _id: string
}

export interface DeleteSupplierDTO {
  idSupplier: string
}
