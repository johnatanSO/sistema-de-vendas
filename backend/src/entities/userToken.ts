import mongoose, { Types } from 'mongoose'

export interface IUserToken {
  _id: Types.ObjectId
  user: Types.ObjectId
  refreshToken: string
  expiresDate: Date
  createdAt: Date
}

const UserTokenSchema = new mongoose.Schema({
  user: { type: 'ObjectId', ref: 'User', default: null },
  refreshToken: { type: String, default: null },
  expiresDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
})

export const UserTokenModel = mongoose.model<IUserToken>(
  'UserToken',
  UserTokenSchema,
)
