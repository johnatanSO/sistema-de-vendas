import mongoose, { Types } from 'mongoose'

export interface Account {
  _id: Types.ObjectId | string
  type: 'in' | 'out'
  userId: string
  code: string
  description: string
  category: string
  value: number
  status: string
  date: Date
}

const accountSchema = new mongoose.Schema({
  type: { type: String, default: null },
  userId: { type: String, default: null },
  code: { type: String, default: null },
  description: { type: String, default: null },
  category: { type: String, default: null },
  value: { type: Number, default: 0 },
  status: { type: String, default: 'pending' },
  date: { type: Date || String, default: Date.now },
})

export const AccountModel = mongoose.model<Account>('Account', accountSchema)
