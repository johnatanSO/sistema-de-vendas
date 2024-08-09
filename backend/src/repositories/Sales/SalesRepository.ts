import { Model } from 'mongoose'
import { Sale, SaleModel } from '../../entities/sale'
import {
  FiltersGetSales,
  INewSaleDTO,
  ISalesRepository,
  UpdateParams,
} from './ISalesRepository'

export class SalesRepository implements ISalesRepository {
  model: Model<Sale> = SaleModel
  async list({
    startDate,
    endDate,
    userId,
    status,
  }: FiltersGetSales): Promise<Sale[]> {
    return await this.model
      .find({
        date: { $gte: startDate, $lt: endDate },
        user: userId,
        ...(status ? { status } : {}),
      })
      .populate([{ path: 'client', select: '_id name' }])
      .sort({ date: -1 })
      .lean()
  }

  async create({
    clientId,
    products,
    paymentType,
    totalValue,
    userId,
    code,
  }: INewSaleDTO): Promise<Sale> {
    const newSale = await this.model.create({
      client: clientId,
      products,
      paymentType,
      totalValue,
      user: userId,
      code,
    })

    await newSale.save()

    return newSale
  }

  async update({ filters, updateFields }: UpdateParams): Promise<void> {
    await this.model.updateOne(filters, updateFields)
  }

  async findById(saleId: string): Promise<Sale> {
    return await this.model.findOne({ _id: saleId }).lean()
  }

  async getEntries(userId: string): Promise<number> {
    return await this.model.countDocuments({ user: userId }).lean()
  }
}
