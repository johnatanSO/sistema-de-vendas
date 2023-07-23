import { paymentTypesList } from '../models/paymentTypesList'

export const format = {
  formatarReal(valor: number | string) {
    return Number(valor).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
  },
  formatarFormaDePagamento(paymentType: string) {
    const paymentFormated = paymentTypesList.find(
      (paymentItem) => paymentItem.value === paymentType,
    )
    return paymentFormated?.text
  },
}
