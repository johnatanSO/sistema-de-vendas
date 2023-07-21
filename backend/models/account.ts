import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  type: { type: String, default: null },
  userId: { type: String, default: null },
  code: { type: String, default: null },
  description: { type: String, default: null },
  category: { type: String, default: null },
  value: { type: Number, default: null },
  date: {
    type: Date || String,
    default: Date.now,
  },
})

export const AccountModel = mongoose.model('Account', accountSchema)
