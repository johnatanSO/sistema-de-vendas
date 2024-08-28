import { STATUS_SALE } from '../models/enums/SaleStatus'

export interface GetAllSalesDTO {
  filters: {
    status?: STATUS_SALE
    startDate?: string | Date
    endDate?: string | Date
  }
}

export interface CreateSaleDTO {
  newSaleData: any
  totalValue: number
}

export interface UpdateSaleDTO {
  saleData: any
  totalValue: number
}

export interface DeleteSaleDTO {
  idSale: string
}
