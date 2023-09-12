import { Router } from 'express'
import { dashboardRoutes } from './dashboard'
import { vendasRoutes } from './vendas'
import { produtosRoutes } from './produtos'
import { usersRoutes } from './users'
import { contasRoutes } from './contas'

const routes = Router()

routes.use('/vendas', vendasRoutes)
routes.use('/dashboard', dashboardRoutes)
routes.use('/produtos', produtosRoutes)
routes.use('/users', usersRoutes)
routes.use('/contas', contasRoutes)

export { routes }
