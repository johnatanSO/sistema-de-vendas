import { z } from 'zod'

const prodSchema = z.object({
  name: z.string(),
  amount: z.number(),
  value: z.number(),
  _id: z.string(),
})

export const newSaleSchema = z.object({
  clientId: z.string(),
  paymentType: z.string(),
  products: z.array(prodSchema),
  totalValue: z.number(),
})

export type INewSale = z.infer<typeof newSaleSchema>
