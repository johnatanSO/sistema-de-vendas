import express from 'express'
import { ProductController } from '../controllers/ProductController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const produtosRoutes = express.Router()
const productController = new ProductController()

// Middlewares
produtosRoutes.use(ensureAuthenticated)

// Routes
produtosRoutes.get('/', productController.listProducts)
produtosRoutes.get('/padroes', productController.getDefaultProducts)
produtosRoutes.post('/', productController.createNewProduct)
produtosRoutes.put('/', productController.updateProduct)
produtosRoutes.delete('/', productController.deleteProduct)

export { produtosRoutes }
