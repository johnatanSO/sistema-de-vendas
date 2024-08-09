import mongoose, { Types } from 'mongoose'
import { Product } from './product'

export interface ProductInSale extends Product {
  amount: number
}

export interface Sale {
  _id: Types.ObjectId
  client: string
  products: ProductInSale[]
  paymentType: string
  totalValue: number
  user: string
  code: string
  status: string
}

const saleSchema = new mongoose.Schema({
  client: { type: 'ObjectId', ref: 'Client', default: null },
  products: [
    {
      _id: { type: String, default: null },
      name: { type: String, default: null },
      value: { type: Number, default: null },
      amount: { type: Number, default: null },
    },
  ],
  paymentType: { type: String, default: null },
  totalValue: { type: Number, default: null },
  date: { type: Date || String, default: Date.now },
  status: { type: String, default: null },
  user: { type: 'ObjectId', ref: 'User', default: null },
  code: { type: String, default: null },
})

export const SaleModel = mongoose.model<Sale>('Sale', saleSchema)
