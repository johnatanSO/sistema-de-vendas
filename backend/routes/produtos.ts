import express, { Request, Response } from 'express'
import { CreateNewProductService } from './../services/CreateNewProductService.service'
import { ProductsRepository } from './../repositories/Products/ProductsRepository'
import { UpdateNewProductService } from '../services/UpdateProductService.service'
import { DeleteProductService } from '../services/DeleteProductService.service'

const produtosRoutes = express.Router()
const productsRepository = new ProductsRepository()

produtosRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const { searchString, userId } = req.query as any
    const queryList = {
      ...(searchString ? { name: new RegExp('^' + searchString) } : {}),
    }
    const products = await productsRepository.list({
      userId,
      ...queryList,
    })

    res.status(200).json({
      items: products,
      message: 'Busca concluída com sucesso!',
    })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

produtosRoutes.get('/padroes', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query as any
    const queryList = {
      isDefault: true,
    }
    const products = await productsRepository.list({
      userId,
      ...queryList,
    })

    res.status(200).json({
      items: products,
      message: 'Busca concluída com sucesso!',
    })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

produtosRoutes.post('/', async (req: Request, res: Response) => {
  const { name, value, stock, isDefault, userInfo } = req.body
  try {
    const createNewProductService = new CreateNewProductService(
      productsRepository,
    )

    const newProduct = await createNewProductService.execute({
      name,
      value,
      stock,
      isDefault,
      userId: userInfo?._id,
    })

    res.status(201).json({
      item: newProduct,
      message: 'Produto cadastrado com sucesso!',
    })
  } catch ({ message }) {
    res.status(400).json({
      message,
    })
  }
})

produtosRoutes.put('/', async (req: Request, res: Response) => {
  const { name, _id, value, stock, userId, isDefault } = req.body

  try {
    const updateNewProductService = new UpdateNewProductService(
      productsRepository,
    )

    const updatedProduct = await updateNewProductService.execute({
      name,
      _id,
      value,
      stock,
      userId,
      isDefault,
    })

    res.status(202).json({
      updatedProduct,
      message: 'Produto atualizado com sucesso',
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

produtosRoutes.delete('/', async (req: Request, res: Response) => {
  const { idProduct } = req.query

  try {
    const deleteProductService = new DeleteProductService(productsRepository)
    await deleteProductService.execute(idProduct)

    res.status(202).json({ message: 'Produto excluído com sucesso' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export { produtosRoutes }
