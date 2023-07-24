import express from 'express'
import { SalesRepository } from '../repositories/Sales/SalesRepository'

const dashboardRoutes = express.Router()

interface Sale {
  paymentType: string
  totalValue: number
}

const salesRepository = new SalesRepository()

dashboardRoutes.get('/formasDePagamento', async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.body as any
    const sales = await salesRepository.list({ startDate, endDate, userId })

    const paymentTypes = sales?.reduce(
      (acc: { type: string; value: number }[], sale: Sale) => {
        const paymentAlreadyExists = !!acc.find(
          (s) => s.type === sale.paymentType,
        )
        if (!paymentAlreadyExists) {
          acc.push({
            type: sale.paymentType,
            value: sale.totalValue,
          })
        } else {
          acc.forEach((s) => {
            if (s.type === sale.paymentType) {
              s.value += sale.totalValue
            }
          })
        }

        return acc
      },
      [],
    )

    res.status(200).json({
      items: paymentTypes,
      message: 'Busca concluída com sucesso',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

export { dashboardRoutes }
