import express, { Request, Response } from 'express'
import { ProductModel } from '../models/product'
import { SalesRepository } from '../repositories/Sales/SalesRepository'

const vendasRoutes = express.Router()
const salesRepository = new SalesRepository()

// [X] - TODO: Refactor and move query to repository.
vendasRoutes.get('/', async (req, res) => {
  try {
    const sales = await salesRepository.list()
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

// [X] - TODO: Refactor and move logic to services.
vendasRoutes.post('/', async (req: Request, res: Response) => {
  const { client, products, paymentType, totalValue = 0 } = req.body
  try {
    if (!paymentType) {
      throw new Error('Forma de pagamento não informada')
    }
    if (!products || products?.length === 0) {
      throw new Error('Nenhum produto selecionado')
    }

    const newSale = salesRepository.create({
      client,
      products,
      paymentType,
      totalValue,
    })

    for (const product of products) {
      await ProductModel.updateOne(
        { _id: product._id },
        { $inc: { stock: -Number(/* product.amount */ 1) } },
      )
    }

    res.status(201).json({
      item: newSale,
      message: 'Venda cadastrada com sucesso!',
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export { vendasRoutes }
