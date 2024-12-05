import http from '../http'
import { NewProduct } from '../screens/Relatorios/ProductsList/ModalCreateNewProduct'

export const productsService = {
  getAll() {
    return http.get('/produtos/')
  },
  create(productData: NewProduct) {
    const body = {
      ...productData,
    }

    return http.post('/produtos/', {
      ...body,
    })
  },
  update(productData: NewProduct) {
    const body = {
      ...productData,
    }
    return http.put('/produtos/', {
      ...body,
    })
  },
  delete(idProduct: string) {
    return http.delete('/produtos/', {
      data: {
        idProduct,
      },
    })
  },
}
