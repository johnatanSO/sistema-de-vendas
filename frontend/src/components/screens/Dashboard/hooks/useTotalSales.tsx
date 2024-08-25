import { STATUS_SALE } from '../../../../models/enums/SaleStatus'
import { ISale } from '../../../../models/interfaces/ISale'

export function useTotalSales(sales: ISale[]) {
  return sales.reduce(
    (acc, sale) => {
      if (sale.status === STATUS_SALE.CANCELED)
        acc.totalValueCanceled += sale.totalValue
      acc.totalValueSales += sale.totalValue
      return acc
    },
    {
      totalValueSales: 0,
      totalValueCanceled: 0,
    },
  )
}
