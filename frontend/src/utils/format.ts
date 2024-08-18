import { paymentTypeList } from '../models/constants/PaymentTypeList'

export const format = {
  formatarReal(valor: number | string) {
    return Number(valor).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
  },
  formatarFormaDePagamento(paymentType: string) {
    const paymentFormated = paymentTypeList.find(
      (paymentItem) => paymentItem.value === paymentType,
    )
    return paymentFormated?.text
  },
}
