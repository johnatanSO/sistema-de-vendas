import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null },
  value: { type: Number, default: null },
  stock: { type: Number, default: null },
})

export const ProductModel = mongoose.model('Product', productSchema)
