import express from 'express'
import { ProductController } from '../controllers/ProductController'

const produtosRoutes = express.Router()
const productController = new ProductController()

produtosRoutes.get('/', productController.listProducts)
produtosRoutes.get('/padroes', productController.getDefaultProducts)
produtosRoutes.post('/', productController.createNewProduct)
produtosRoutes.put('/', productController.updateProduct)
produtosRoutes.delete('/', productController.deleteProduct)

export { produtosRoutes }
