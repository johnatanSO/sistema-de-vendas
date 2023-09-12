import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
})

export const UserModel = mongoose.model('User', userSchema)
