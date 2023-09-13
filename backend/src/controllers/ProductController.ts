import { Request, Response } from 'express'
import { ProductsRepository } from '../repositories/Products/ProductsRepository'
import { container } from 'tsyringe'
import { CreateNewProductService } from '../useCases/Product/CreateNewProductService.service'
import { UpdateNewProductService } from '../useCases/Product/UpdateProductService.service'
import { DeleteProductService } from '../useCases/Product/DeleteProductService.service'

const productsRepository = new ProductsRepository()

export class ProductController {
  async listProducts(req: Request, res: Response): Promise<Response> {
    try {
      const { searchString, userId } = req.query as any
      const queryList = {
        ...(searchString ? { name: new RegExp('^' + searchString) } : {}),
      }
      const products = await productsRepository.list({
        userId,
        ...queryList,
      })

      return res.status(200).json({
        items: products,
        message: 'Busca concluída com sucesso!',
      })
    } catch ({ message }) {
      return res.status(500).json({ message })
    }
  }

  async getDefaultProducts(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.query as any

      const queryList = {
        isDefault: true,
      }

      const products = await productsRepository.list({
        userId,
        ...queryList,
      })

      return res.status(200).json({
        items: products,
        message: 'Busca concluída com sucesso!',
      })
    } catch ({ message }) {
      return res.status(500).json({ message })
    }
  }

  async createNewProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { name, value, stock, isDefault, userInfo } = req.body

      const createNewProductService = container.resolve(CreateNewProductService)
      const newProduct = await createNewProductService.execute({
        name,
        value,
        stock,
        isDefault,
        userId: userInfo?._id,
      })

      return res.status(201).json({
        item: newProduct,
        message: 'Produto cadastrado com sucesso!',
      })
    } catch ({ message }) {
      return res.status(400).json({
        message,
      })
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { name, _id, value, stock, userId, isDefault } = req.body

      const updateNewProductService = container.resolve(UpdateNewProductService)
      const updatedProduct = await updateNewProductService.execute({
        name,
        _id,
        value,
        stock,
        userId,
        isDefault,
      })

      return res.status(202).json({
        updatedProduct,
        message: 'Produto atualizado com sucesso',
      })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { idProduct } = req.query

      const deleteProductService = container.resolve(DeleteProductService)
      await deleteProductService.execute(idProduct)

      return res.status(202).json({ message: 'Produto excluído com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
