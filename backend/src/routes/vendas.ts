import express, { Request, Response } from 'express'
import { CreateNewSaleService } from '../useCases/Sale/CreateNewSale.service'
import { GetSalesService } from '../useCases/Sale/GetSalesService.service'
import { UpdateProductsStock } from '../useCases/Product/UpdateProductsStock.service'
import { CancelSaleService } from '../useCases/Sale/CancelSaleService.service'
import { UpdateNewSaleService } from '../useCases/Sale/UpdateSaleService.service'
import { SalesRepository } from '../repositories/Sales/SalesRepository'
import { ProductsRepository } from '../repositories/Products/ProductsRepository'

const vendasRoutes = express.Router()
const salesRepository = new SalesRepository()
const productsRepository = new ProductsRepository()

vendasRoutes.get('/', async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query as any
    const getSalesService = new GetSalesService(salesRepository)
    const sales = await getSalesService.execute({ startDate, endDate, userId })

    res.status(200).json({
      items: sales,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

vendasRoutes.post('/', async (req: Request, res: Response) => {
  const {
    client,
    products,
    paymentType,
    totalValue = 0,
    userInfo,
  } = req.body as any

  try {
    const createNewSaleService = new CreateNewSaleService(salesRepository)
    const newSale = await createNewSaleService.execute({
      client,
      products,
      paymentType,
      totalValue,
      userId: userInfo?._id,
    })

    const updateProductsStock = new UpdateProductsStock(productsRepository)
    await updateProductsStock.execute(products)

    res.status(201).json({
      item: newSale,
      message: 'Venda cadastrada com sucesso!',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

vendasRoutes.put('/', async (req: Request, res: Response) => {
  const {
    _id,
    client,
    products,
    paymentType,
    totalValue = 0,
    userInfo,
  } = req.body as any

  try {
    const updateNewSaleService = new UpdateNewSaleService(salesRepository)
    const newSale = await updateNewSaleService.execute({
      _id,
      client,
      products,
      paymentType,
      totalValue,
      userId: userInfo?._id,
    })

    const updateProductsStock = new UpdateProductsStock(productsRepository)
    await updateProductsStock.execute(products)

    res.status(201).json({
      item: newSale,
      message: 'Venda cadastrada com sucesso!',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

vendasRoutes.put('/cancelar', async (req: Request, res: Response) => {
  const { _id } = req.body
  try {
    const cancelSaleService = new CancelSaleService(salesRepository)
    cancelSaleService.execute(_id)

    res.status(201).json({
      message: 'Venda cancelada com sucesso!',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export { vendasRoutes }
