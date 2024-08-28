import { STATUS_SALE } from '../../../../models/enums/SaleStatus'
import { ISale } from '../../../../models/interfaces/ISale'

export function useTotalSales(sales: ISale[]) {
  return sales.reduce(
    (acc, sale) => {
      if (sale.status === STATUS_SALE.CANCELED) {
        acc.totalValueCanceled += sale.totalValue
      } else {
        acc.totalValueApproved += sale.totalValue
      }

      return acc
    },
    {
      totalValueApproved: 0,
      totalValueCanceled: 0,
    },
  )
}
