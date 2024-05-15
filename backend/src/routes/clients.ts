import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ClientController } from '../controllers/ClientController'

const clientsRoutes = Router()
const clientController = new ClientController()

// Middlewares
clientsRoutes.use(ensureAuthenticated)

// Routes
clientsRoutes.post('/', clientController.create)
clientsRoutes.get('/', clientController.list)
clientsRoutes.delete('/:clientId', clientController.delete)

export { clientsRoutes }
