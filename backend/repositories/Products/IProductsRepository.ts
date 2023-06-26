import { Types } from 'mongoose'

export interface Product {
  _id?: Types.ObjectId
  name: string
  value: number
  stock: number
  amount?: number
}

export interface IProductsRepository {
  list: () => Promise<Product[]>
  create: (ProductData: Product) => Promise<Product>
  update: (ProductData: Product) => Promise<Product>
  delete: (idProduct: string) => void
  findByName: (name: string) => Promise<Product | null>
  findById: (productId: string) => Promise<Product | null>
  updateStock: (product: Product) => void
}
