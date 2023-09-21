import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewProductService } from '../useCases/Product/CreateNewProduct/CreateNewProductService.service'
import { UpdateNewProductService } from '../useCases/Product/UpdateProduct/UpdateProductService.service'
import { DeleteProductService } from '../useCases/Product/DeleteProduct/DeleteProductService.service'
import { ListProductsService } from '../useCases/Product/ListProducts/ListProductsService.service'
import { ListDefaultProductsService } from '../useCases/Product/ListDefaultProducts/ListDefaultProductsService.service'

export class ProductController {
  async listProducts(req: Request, res: Response): Promise<Response> {
    const { searchString } = req.query as any
    const { userId } = req.user

    const listProductsService = container.resolve(ListProductsService)
    const products = await listProductsService.execute({
      searchString,
      userId,
    })

    return res.status(200).json({
      success: true,
      items: products,
      message: 'Busca de produtos concluída com sucesso',
    })
  }

  async getDefaultProducts(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query as any

    const listDefaultProductsService = container.resolve(
      ListDefaultProductsService,
    )

    const products = await listDefaultProductsService.execute({
      userId,
    })

    return res.status(200).json({
      success: true,
      items: products,
      message: 'Busca de produtos concluída com sucesso',
    })
  }

  async createNewProduct(req: Request, res: Response): Promise<Response> {
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
      success: true,
      item: newProduct,
      message: 'Produto cadastrado com sucesso',
    })
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    const { name, _id: idProduct, value, stock, isDefault } = req.body

    const updateNewProductService = container.resolve(UpdateNewProductService)
    const updatedProduct = await updateNewProductService.execute({
      name,
      idProduct,
      value,
      stock,
      isDefault,
    })

    return res.status(202).json({
      success: true,
      updatedProduct,
      message: 'Produto atualizado com sucesso',
    })
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { idProduct } = req.query as any

    const deleteProductService = container.resolve(DeleteProductService)
    await deleteProductService.execute(idProduct)

    return res.status(202).json({
      success: true,
      message: 'Produto excluído com sucesso',
    })
  }
}
