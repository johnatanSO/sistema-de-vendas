import mongoose, { Types } from 'mongoose'

export interface Supplier {
  _id: Types.ObjectId | string
  code: string
  name: string
  email: string
  cnpj: string
  phone: string
  userId: string
}

const supplierSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  cnpj: { type: String, default: null },
  phone: { type: String, default: null },
  userId: { type: String, default: null },
})

export const SupplierModel = mongoose.model<Supplier>(
  'Supplier',
  supplierSchema,
)
