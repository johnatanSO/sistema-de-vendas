import { IProduct } from './IProduct'

export interface ISale {
  status: string
  totalValue: number
  products: IProduct[]
}
