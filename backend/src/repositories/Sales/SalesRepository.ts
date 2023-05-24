import { SaleModel } from '../../models/sale'
import { ISalesRepository, Sale } from './ISalesRepository'

export class SalesRepository implements ISalesRepository {
  async list(): Promise<Sale[]> {
    return await SaleModel.find()
  }

  async create({
    client,
    products,
    paymentType,
    totalValue,
  }: Sale): Promise<Sale> {
    const newSale = new SaleModel({
      client,
      products,
      paymentType,
      totalValue,
    })
    await newSale.save()
    return newSale
  }
}
