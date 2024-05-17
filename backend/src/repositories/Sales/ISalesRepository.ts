import { ProductInSale, Sale } from '../../entities/sale'

export interface INewSaleDTO {
  clientId: string
  products: ProductInSale[]
  paymentType: string
  totalValue: number
  userId: string
  code: string
}

export interface FiltersGetSales {
  startDate: any
  endDate: any
  userId: string
  status: string
}

export interface UpdateParams {
  filters: any
  updateFields: any
}

export interface ISalesRepository {
  list: (filters: FiltersGetSales) => Promise<Sale[]>
  getEntries: (userId: string) => Promise<number>
  create: (SaleData: INewSaleDTO) => Promise<Sale>
  update: (updateParams: UpdateParams) => Promise<void>
  findById: (saleId: string) => Promise<Sale>
}
