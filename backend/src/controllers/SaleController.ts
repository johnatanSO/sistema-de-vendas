import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSalesService } from '../useCases/Sale/GetSales/GetSalesService.service'
import { CreateNewSaleService } from '../useCases/Sale/CreateNewSale/CreateNewSale.service'
import { CancelSaleService } from '../useCases/Sale/CancelSale/CancelSaleService.service'
import { UpdateNewSaleService } from '../useCases/Sale/UpdateSale/UpdateSaleService.service'
import { UpdateProductsStock } from '../useCases/Product/UpdateProductStock/UpdateProductsStock.service'

export class SaleController {
  async listSales(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate, status } = req.query as any
    const { userId } = req.user

    const getSalesService = container.resolve(GetSalesService)
    const sales = await getSalesService.execute({
      startDate,
      endDate,
      userId,
      status,
    })

    return res.status(200).json({
      success: true,
      items: sales,
      message: 'Busca de vendas concluída com sucesso',
    })
  }

  async createNewSale(req: Request, res: Response): Promise<Response> {
    const { clientId, products, paymentType, totalValue = 0 } = req.body
    const { userId } = req.user

    const createNewSaleService = container.resolve(CreateNewSaleService)
    const newSale = await createNewSaleService.execute({
      clientId,
      products,
      paymentType,
      totalValue,
      userId,
    })

    const updateProductsStock = container.resolve(UpdateProductsStock)
    await updateProductsStock.execute({ products })

    return res.status(201).json({
      success: true,
      item: newSale,
      message: 'Venda cadastrada com sucesso',
    })
  }

  async updateSale(req: Request, res: Response): Promise<Response> {
    const {
      _id: idSale,
      client,
      products,
      paymentType,
      totalValue = 0,
      status,
    } = req.body

    const updateNewSaleService = container.resolve(UpdateNewSaleService)
    const newSale = await updateNewSaleService.execute({
      idSale,
      client,
      products,
      paymentType,
      totalValue,
      status,
    })

    const updateProductsStock = container.resolve(UpdateProductsStock)
    await updateProductsStock.execute({ products })

    return res.status(201).json({
      success: true,
      item: newSale,
      message: 'Venda atualizada com sucesso',
    })
  }

  async cancelSale(req: Request, res: Response): Promise<Response> {
    const { _id: idSale } = req.body

    const cancelSaleService = container.resolve(CancelSaleService)
    await cancelSaleService.execute(idSale)

    return res.status(201).json({
      success: true,
      message: 'Venda cancelada com sucesso',
    })
  }
}
