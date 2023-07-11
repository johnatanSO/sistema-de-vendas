import http from '../http'
import { NewSale } from '../screens/NovaVenda'
import { Sale } from '../screens/Vendas'

export const salesService = {
  getAll() {
    return http.get('/vendas')
  },
  create(saleData: NewSale, totalValue: number) {
    const body = { ...saleData, totalValue }
    return http.post('/vendas', { ...body })
  },
  cancel(saleData: Sale) {
    const body = { ...saleData }
    return http.put('/vendas/cancelar', { ...body })
  },
}
