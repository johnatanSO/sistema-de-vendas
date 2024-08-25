import { IClient } from './IClient'
import { IProduct } from './IProduct'

export interface ISale {
  _id: string
  date: Date
  totalValue: number
  client: IClient
  status: string
  products: IProduct[]
}
