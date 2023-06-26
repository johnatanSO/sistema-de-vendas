export const format = {
  formatarReal(valor: number | string) {
    return Number(valor).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
  },
}
