import express from 'express'
import { AccountController } from '../controllers/AccountController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const contasRoutes = express.Router()
const accountController = new AccountController()

// Middlewares
contasRoutes.use(ensureAuthenticated)

// Routes
contasRoutes.get('/', accountController.listAccounts)
contasRoutes.post('/', accountController.createNewAccount)
contasRoutes.put('/', accountController.updateAccount)
contasRoutes.patch(
  '/updateStatus/:idAccount',
  accountController.updateStatusAccount,
)
contasRoutes.delete('/', accountController.deleteAccount)

export { contasRoutes }
