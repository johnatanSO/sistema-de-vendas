import { IProduct } from '../../../../models/interfaces/IProduct'
import { ISale } from '../../../../models/interfaces/ISale'

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
            if (accProduct.amount) {
              accProduct.amount += Number(product.amount || 0)
              accProduct.value += product.value
            }
          }
        })
      }
    })

    return acc
  }, [])
}
