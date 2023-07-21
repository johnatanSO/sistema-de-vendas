import { ProductModel } from '../../models/product'
import { IProductsRepository, Product, QueryList } from './IProductsRepository'

export class ProductsRepository implements IProductsRepository {
  async list(queryList: QueryList): Promise<Product[]> {
    return await ProductModel.find(queryList)
  }

  async create(ProductData: Product): Promise<Product> {
    const newProduct = new ProductModel(ProductData)
    await newProduct.save()

    return newProduct
  }

  async update(ProductData: Product): Promise<any> {
    return await ProductModel.updateOne(
      { _id: ProductData?._id },
      { $set: ProductData },
    )
  }

  async delete(idProduct: string) {
    await ProductModel.deleteOne({ _id: idProduct })
  }

  async findByName(name: string): Promise<Product | null> {
    return await ProductModel.findOne({ name })
  }

  async findById(productId: string): Promise<Product | null> {
    return await ProductModel.findOne({ _id: productId })
  }

  async updateStock(product: Product) {
    await ProductModel.updateOne(
      { _id: product._id },
      { $inc: { stock: -Number(product.amount) } },
    )
  }

  async getEntries(userId: string): Promise<number> {
    return ProductModel.countDocuments({ userId })
  }
}
