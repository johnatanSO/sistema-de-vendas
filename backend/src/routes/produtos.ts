import express, { Request, Response } from 'express'
import { UpdateNewProductService } from '../useCases/Product/UpdateProductService.service'
import { DeleteProductService } from '../useCases/Product/DeleteProductService.service'
import { ProductsRepository } from '../repositories/Products/ProductsRepository'
import { ProductController } from '../controllers/ProductController'

const produtosRoutes = express.Router()
const productsRepository = new ProductsRepository()
const productController = new ProductController()

produtosRoutes.get('/', productController.listProducts)

produtosRoutes.get('/padroes', productController.listProducts)

produtosRoutes.post('/', productController.createNewProduct)

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
