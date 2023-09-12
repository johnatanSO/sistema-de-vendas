import { Types } from 'mongoose'

export interface Product {
  _id?: Types.ObjectId
  name: string
  value: number
  stock: number
  amount?: number
  code?: string
  userId: string
  isDefault: boolean
}

export interface QueryList {
  searchString?: string
  isDefault?: boolean
  userId: string
}

export interface IProductsRepository {
  list: (QueryList: QueryList) => Promise<Product[]>
  create: (ProductData: Product) => Promise<Product>
  update: (ProductData: Product) => Promise<Product>
  delete: (idProduct: string) => void
  findByName: (name: string) => Promise<Product | null>
  findById: (productId: string | Types.ObjectId) => Promise<Product | null>
  updateStock: (product: Product) => void
  getEntries: (userId: String) => Promise<number>
}
