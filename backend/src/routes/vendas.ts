import express from 'express'
import { SaleController } from '../controllers/SaleController'

const vendasRoutes = express.Router()
const saleController = new SaleController()

vendasRoutes.get('/', saleController.listSales)
vendasRoutes.post('/', saleController.createNewSale)
vendasRoutes.put('/', saleController.updateSale)
vendasRoutes.put('/cancelar', saleController.cancelSale)

export { vendasRoutes }
