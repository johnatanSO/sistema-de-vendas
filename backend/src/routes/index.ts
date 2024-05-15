import { Router } from 'express'
import { dashboardRoutes } from './dashboard'
import { vendasRoutes } from './vendas'
import { produtosRoutes } from './produtos'
import { usersRoutes } from './users'
import { contasRoutes } from './contas'
import { authenticateRoutes } from './authenticate'
import { suppliersRoutes } from './suppliers'
import { clientsRoutes } from './clients'

const routes = Router()

routes.use(authenticateRoutes)
routes.use('/vendas', vendasRoutes)
routes.use('/dashboard', dashboardRoutes)
routes.use('/produtos', produtosRoutes)
routes.use('/users', usersRoutes)
routes.use('/contas', contasRoutes)
routes.use('/fornecedores', suppliersRoutes)
routes.use('/clientes', clientsRoutes)

export { routes }
