import mongoose, { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId | string
  code: string
  name: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
})

export const UserModel = mongoose.model<User>('User', userSchema)
