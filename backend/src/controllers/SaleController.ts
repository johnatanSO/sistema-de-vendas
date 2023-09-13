import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSalesService } from '../useCases/Sale/GetSalesService.service'
import { CreateNewSaleService } from '../useCases/Sale/CreateNewSale.service'
import { UpdateProductsStock } from '../useCases/Product/UpdateProductsStock.service'
import { CancelSaleService } from '../useCases/Sale/CancelSaleService.service'
import { UpdateNewSaleService } from '../useCases/Sale/UpdateSaleService.service'

export class SaleController {
  async listSales(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate, userId } = req.query as any

      const getSalesService = container.resolve(GetSalesService)
      const sales = await getSalesService.execute({
        startDate,
        endDate,
        userId,
      })

      return res.status(200).json({
        items: sales,
        message: 'Busca concluída com sucesso!',
      })
    } catch (err) {
      return res
        .status(500)
        .json({ error: err, message: 'Falha ao buscar dados', items: [] })
    }
  }

  async createNewSale(req: Request, res: Response): Promise<Response> {
    try {
      const {
        client,
        products,
        paymentType,
        totalValue = 0,
        userInfo,
      } = req.body as any

      const createNewSaleService = container.resolve(CreateNewSaleService)
      const newSale = await createNewSaleService.execute({
        client,
        products,
        paymentType,
        totalValue,
        userId: userInfo?._id,
      })

      const updateProductsStock = container.resolve(UpdateProductsStock)
      await updateProductsStock.execute(products)

      return res.status(201).json({
        item: newSale,
        message: 'Venda cadastrada com sucesso!',
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  async updateSale(req: Request, res: Response): Promise<Response> {
    try {
      const {
        _id,
        client,
        products,
        paymentType,
        totalValue = 0,
        userInfo,
      } = req.body as any

      const updateNewSaleService = container.resolve(UpdateNewSaleService)
      const newSale = await updateNewSaleService.execute({
        _id,
        client,
        products,
        paymentType,
        totalValue,
        userId: userInfo?._id,
      })

      const updateProductsStock = container.resolve(UpdateProductsStock)
      await updateProductsStock.execute(products)

      return res.status(201).json({
        item: newSale,
        message: 'Venda cadastrada com sucesso!',
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  async cancelSale(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.body

      const cancelSaleService = container.resolve(CancelSaleService)
      cancelSaleService.execute(_id)

      return res.status(201).json({
        message: 'Venda cancelada com sucesso!',
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
