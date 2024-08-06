import { ISale } from '../interfaces/ISale'

export function useTotalSales(sales: ISale[]) {
  return sales.reduce(
    (acc, sale) => {
      if (sale.status === 'canceled') acc.totalValueCanceled += sale.totalValue
      acc.totalValueSales += sale.totalValue
      return acc
    },
    {
      totalValueSales: 0,
      totalValueCanceled: 0,
    },
  )
}
