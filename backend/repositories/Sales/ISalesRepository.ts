interface SaleProduct {
  name: string
  amount: number
  value: number
}

export interface Sale {
  client: string
  products: SaleProduct[]
  paymentType: string
  totalValue: number
}

export interface ISalesRepository {
  list: () => Promise<Sale[]>
  create: (SaleData: Sale) => Promise<Sale>
  cancel: (idSale: string) => void
}
