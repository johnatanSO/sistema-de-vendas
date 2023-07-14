import { SaleModel } from '../../models/sale'
import { ISalesRepository, Sale } from './ISalesRepository'

export class SalesRepository implements ISalesRepository {
  async list({ startDate, endDate, userId }): Promise<Sale[]> {
    return await SaleModel.find({
      date: { $gte: startDate, $lt: endDate },
      userId,
    }).sort({ date: -1 })
  }

  async create({
    client,
    products,
    paymentType,
    totalValue,
    userId,
    code,
  }: Sale): Promise<Sale> {
    const newSale = new SaleModel({
      client,
      products,
      paymentType,
      totalValue,
      userId,
      code,
    })
    await newSale.save()
    return newSale
  }

  async cancel(idSale: string) {
    await SaleModel.updateOne({ _id: idSale }, { $set: { status: 'canceled' } })
  }

  async getEntries(userId: string): Promise<number> {
    return SaleModel.countDocuments({ userId })
  }
}
