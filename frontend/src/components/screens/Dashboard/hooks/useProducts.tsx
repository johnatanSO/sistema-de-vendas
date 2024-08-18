import { IProduct } from '../interfaces/IProduct'
import { ISale } from '../interfaces/ISale'

export function useProducts(sales: ISale[]) {
  return sales.reduce((acc: IProduct[], sale) => {
    sale.products.forEach((product) => {
      const productAlreadyExist = !!acc.find(
        (accProduct) => accProduct._id === product._id,
      )
      if (!productAlreadyExist) {
        acc.push({
          ...product,
        })
      } else {
        acc.forEach((accProduct) => {
          if (accProduct._id === product._id) {
            accProduct.amount += product.amount
            accProduct.value += product.value
          }
        })
      }
    })

    return acc
  }, [])
}
