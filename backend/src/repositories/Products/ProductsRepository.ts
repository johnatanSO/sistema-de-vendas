import { Model } from 'mongoose'
import { Product, ProductModel } from '../../entities/product'
import {
  INewProductDTO,
  IProductsRepository,
  FiltersListProducts,
  UpdateParams,
} from './IProductsRepository'

export class ProductsRepository implements IProductsRepository {
  model: Model<Product> = ProductModel
  async list({
    userId,
    searchString,
    onlyDefault,
  }: FiltersListProducts): Promise<Product[]> {
    const query = {
      user: userId,
      ...(searchString
        ? { name: { $regex: searchString, $options: 'i' } }
        : {}),
      ...(onlyDefault ? { isDefault: true } : {}),
    }
    return await ProductModel.find(query).lean()
  }

  async create({
    code,
    isDefault,
    stock,
    name,
    userId,
    value,
  }: INewProductDTO): Promise<Product> {
    const newProduct = await this.model.create({
      code,
      isDefault,
      stock,
      name,
      user: userId,
      value,
    })
    await newProduct.save()

    return newProduct
  }

  async update({ filters, updateFields }: UpdateParams): Promise<void> {
    await this.model.updateOne(filters, updateFields)
  }

  async delete(idProduct: string): Promise<void> {
    await ProductModel.deleteOne({ _id: idProduct })
  }

  async findByName(name: string): Promise<Product> {
    return await ProductModel.findOne({ name }).lean()
  }

  async findById(productId: string): Promise<Product> {
    return await ProductModel.findOne({ _id: productId }).lean()
  }

  async getEntries(userId: string): Promise<number> {
    return ProductModel.countDocuments({ user: userId }).lean()
  }
}
