import mongoose, { Types } from 'mongoose'

export interface Account {
  _id: Types.ObjectId | string
  type: 'in' | 'out'
  user: string
  code: string
  description: string
  category: string
  value: number
  status: string
  date: Date
}

const accountSchema = new mongoose.Schema({
  type: { type: String, default: null },
  user: { type: 'ObjectId', ref: 'User', default: null },
  code: { type: String, default: null },
  description: { type: String, default: null },
  category: { type: String, default: null },
  value: { type: Number, default: 0 },
  status: { type: String, default: 'pending' },
  date: { type: Date || String, default: Date.now },
})

export const AccountModel = mongoose.model<Account>('Account', accountSchema)
