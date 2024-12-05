import { ISaleProduct } from './ISaleProduct'

export interface INewSale {
  client: string
  products: ISaleProduct[]
  paymentType: string
}
