import { z } from 'zod'

const prodSchema = z.object({
  name: z.string(),
  amount: z.number().optional(),
  value: z.number(),
  _id: z.string(),
})

export const newSaleSchema = z
  .object({
    clientId: z.string().nullable(),
    paymentType: z
      .string()
      .min(1, 'Forma de pagamento não selecionada')
      .nullable(),
    products: z.array(prodSchema),
    totalValue: z.number(),
  })
  .refine(({ products }) => products.length === 0, {
    message: 'Nenhum produto selecionado',
  })

export type INewSale = z.infer<typeof newSaleSchema>
