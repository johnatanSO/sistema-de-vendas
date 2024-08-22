import { z } from 'zod'

export const newProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  value: z.number(),
  stock: z.number().min(0, 'Insira uma quantidade maior do que zero'),
  isDefault: z.boolean(),
})

export type INewProduct = z.infer<typeof newProductSchema>
