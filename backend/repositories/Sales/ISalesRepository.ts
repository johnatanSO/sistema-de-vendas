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
  client: string
  products: SaleProduct[]
  paymentType: string
  totalValue: number
  userId: string
  code: string
}

export interface ISalesRepository {
  list: (filters: FiltersGetSales) => Promise<Sale[]>
  getEntries: (userId: string) => Promise<number>
  create: (SaleData: Sale) => Promise<Sale>
  cancel: (idSale: string) => void
}
