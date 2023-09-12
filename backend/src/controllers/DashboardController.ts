import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSalesService } from '../useCases/Sale/GetSalesService.service'

export class DashboardController {
  async getPaymentTypes(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate, userId } = req.query as any

      const getSalesService = container.resolve(GetSalesService)
      const sales = await getSalesService.execute({
        startDate,
        endDate,
        userId,
      })

      const paymentTypes = sales?.reduce(
        (acc: { type: string; value: number }[], sale) => {
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

      return res.status(200).json({
        items: paymentTypes,
        message: 'Busca concluída com sucesso',
      })
    } catch (err) {
      return res
        .status(500)
        .json({ error: err, message: 'Falha ao buscar dados', items: [] })
    }
  }
}
