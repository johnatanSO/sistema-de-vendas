import express from 'express'
import { SaleController } from '../controllers/SaleController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const vendasRoutes = express.Router()
const saleController = new SaleController()

// Midlewares
vendasRoutes.use(ensureAuthenticated)

// Routes
vendasRoutes.get('/', saleController.listSales)
vendasRoutes.post('/', saleController.createNewSale)
vendasRoutes.put('/', saleController.updateSale)
vendasRoutes.put('/cancelar', saleController.cancelSale)

export { vendasRoutes }
