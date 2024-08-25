import { IProduct } from '../../../../models/interfaces/IProduct'

export function usePizzaGraph(products: IProduct[]) {
  return {
    title: 'Vendas por produto',
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    values: products.map((product) => {
      return {
        name: product?.name || '',
        value: product?.value,
        amount: product?.amount,
      }
    }),
  }
}
