import { Types } from 'mongoose'

interface SaleProduct {
  name: string
  amount: number
  value: number
}

export interface FiltersGetSales {
  startDate: any
  endDate: any
  userId: string
}

export interface Sale {
  _id?: Types.ObjectId
  client: string
  products: SaleProduct[]
  paymentType: string
  totalValue: number
  userId: string
  code?: string
}

export interface ISalesRepository {
  list: (filters: FiltersGetSales) => Promise<Sale[]>
  getEntries: (userId: string) => Promise<number>
  create: (SaleData: Sale) => Promise<Sale>
  update: (SaleData: Sale) => Promise<Sale>
  findById: (saleId: string | Types.ObjectId) => Promise<Sale | null>
  cancel: (idSale: string) => void
}
