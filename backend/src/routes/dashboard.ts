import express from 'express'
import { DashboardController } from '../controllers/DashboardController'

const dashboardRoutes = express.Router()
const dashboardController = new DashboardController()

dashboardRoutes.get('/formasDePagamento', dashboardController.getPaymentTypes)

export { dashboardRoutes }
