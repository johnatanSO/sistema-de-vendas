import mongoose, { Types } from 'mongoose'

export interface Product {
  _id: Types.ObjectId | string
  name: string
  value: number
  stock: number
  code: string
  user: string
  isDefault: boolean
  amount?: number
}

const productSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null },
  value: { type: Number, default: null },
  stock: { type: Number, default: null },
  user: { type: 'ObjectId', ref: 'User', default: null },
  isDefault: { type: Boolean, default: false },
})

export const ProductModel = mongoose.model<Product>('Product', productSchema)
