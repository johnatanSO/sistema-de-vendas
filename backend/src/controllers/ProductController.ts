import { Request, Response } from 'express'
import { ProductsRepository } from '../repositories/Products/ProductsRepository'
import { container } from 'tsyringe'
import { CreateNewProductService } from '../useCases/Product/CreateNewProduct/CreateNewProductService.service'
import { UpdateNewProductService } from '../useCases/Product/UpdateProduct/UpdateProductService.service'
import { DeleteProductService } from '../useCases/Product/DeleteProduct/DeleteProductService.service'

const productsRepository = new ProductsRepository()

export class ProductController {
  async listProducts(req: Request, res: Response): Promise<Response> {
    const { searchString } = req.query
    const { userId } = req.user

    // REFATORAR ISSO DAQUI PARA UM CASO DE USO
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
  }

  async getDefaultProducts(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query as any

    const queryList = {
      isDefault: true,
    }

    const products = await productsRepository.list({
      userId,
      ...queryList,
    })

    return res.status(200).json({
      success: true,
      items: products,
      message: 'Busca concluída com sucesso!',
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
      message: 'Produto cadastrado com sucesso!',
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
