export interface GetAllSalesDTO {
  filters: {
    status: string
    startDate: string | Date
    endDate: string | Date
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
