import { Types } from 'mongoose'
import { Product } from '../../entities/product'

export interface INewProductDTO {
  name: string
  value: number
  stock: number
  code: string
  userId: string
  isDefault: boolean
}

export interface QueryList {
  searchString?: string
  isDefault?: boolean
  userId: string
}

export interface UpdateStockParams {
  productId: string
  amount: number
}

export interface UpdateParams {
  filters: any
  updateFields: any
}

export interface IProductsRepository {
  list: (QueryList: QueryList) => Promise<Product[]>
  create: (ProductData: INewProductDTO) => Promise<Product>
  delete: (idProduct: string) => Promise<void>
  findByName: (name: string) => Promise<Product>
  findById: (productId: string | Types.ObjectId) => Promise<Product>
  update: (updateParams: UpdateParams) => Promise<void>
  getEntries: (userId: string) => Promise<number>
}
