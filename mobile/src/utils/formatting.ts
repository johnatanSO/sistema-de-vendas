export const formasDePagamento = [
  { text: 'Dinheiro', value: 'dinheiro' },
  { text: 'PIX', value: 'pix' },
  { text: 'Cartão de crédito', value: 'credit_card' },
  { text: 'Cartão de débito', value: 'debit_card' },
]

export const formatting = {
  formatarReal(value: number | string) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  },
  formatarFormaDePagamento(paymentType: string) {
    const paymentTypeFormated = formasDePagamento.find(
      (payment) => payment.value === paymentType,
    )

    return paymentTypeFormated ? paymentTypeFormated.text : '--'
  },
}
