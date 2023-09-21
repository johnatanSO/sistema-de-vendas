import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSalesService } from '../useCases/Sale/GetSales/GetSalesService.service'

export class DashboardController {
  async getPaymentTypes(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate, status } = req.query as any
    const { userId } = req.user

    // REFATORAR E MOVER TODA ESSA FUNÇÃO PARA UM CASO DE USO;
    const getSalesService = container.resolve(GetSalesService)
    const sales = await getSalesService.execute({
      startDate,
      endDate,
      userId,
      status,
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
      success: true,
      items: paymentTypes,
      message: 'Busca de pagamentos concluída com sucesso',
    })
  }
}
