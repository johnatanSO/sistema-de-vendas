import mongoose, { Types } from 'mongoose'

export interface Client {
  _id: Types.ObjectId | string
  code: string
  name: string
  email: string
  cpf: string
  phone: string
  user: string
}

const clientSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  cpf: { type: String, default: null },
  phone: { type: String, default: null },
  user: { type: 'ObjectId', ref: 'User', default: null },
})

export const ClientModel = mongoose.model<Client>('Client', clientSchema)
