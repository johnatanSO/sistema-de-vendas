import express, { Request, Response } from 'express'
import { CreateNewProductService } from './../services/CreateNewProductService.service'
import { ProductsRepository } from './../repositories/Products/ProductsRepository'
import { UpdateNewProductService } from '../services/UpdateProductService.service'
import { DeleteProductService } from '../services/DeleteProductService.service'

const produtosRoutes = express.Router()
const productsRepository = new ProductsRepository()

// [X] - TODO: Refactor and move query to repository.
produtosRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productsRepository.list()
    res.status(200).json({
      items: products,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

// [X] - TODO: Refactor and move logic to services.
produtosRoutes.post('/', async (req: Request, res: Response) => {
  const { name, value, stock } = req.body
  try {
    const createNewProductService = new CreateNewProductService(
      productsRepository,
    )

    const newProduct = await createNewProductService.execute({
      name,
      value,
      stock,
    })

    res.status(201).json({
      item: newProduct,
      message: 'Produto cadastrado com sucesso!',
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    })
  }
})

// [X] - TODO: Refactor and move logic to services.
produtosRoutes.put('/', async (req: Request, res: Response) => {
  const { name, _id, value, stock } = req.body

  try {
    const updateNewProductService = new UpdateNewProductService(
      productsRepository,
    )

    const updatedProduct = await updateNewProductService.execute({
      name,
      _id,
      value,
      stock,
    })

    res.status(202).json({
      updatedProduct,
      message: 'Produto atualizado com sucesso',
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// [X] - TODO: Refactor and move logic to services.
produtosRoutes.delete('/', async (req: Request, res: Response) => {
  const { idProduct } = req.body

  try {
    const deleteProductService = new DeleteProductService(productsRepository)
    await deleteProductService.execute(idProduct)

    res.status(202).json({ message: 'Produto excluído com sucesso' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export { produtosRoutes }
