import { Router } from 'express'
import { SupplierController } from '../controllers/SupplierController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const suppliersRoutes = Router()
const supplierController = new SupplierController()

// Middlewares
suppliersRoutes.use(ensureAuthenticated)

// Routes
suppliersRoutes.post('/', supplierController.create)
suppliersRoutes.get('/', supplierController.list)
suppliersRoutes.delete('/:supplierId', supplierController.delete)

export { suppliersRoutes }
