import { IClient } from './IClient'

export interface ISale {
  _id: string
  date: Date
  totalValue: number
  client: IClient
  status: string
}
