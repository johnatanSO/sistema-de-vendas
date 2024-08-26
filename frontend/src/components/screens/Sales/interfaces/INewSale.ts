import { z } from 'zod'

const prodSchema = z.object({
  name: z.string(),
  amount: z.number().min(1, 'A quantidade deve ser maior que 0').optional(),
  value: z.number().min(1, 'O valor deve ser maior que 0'),
  _id: z.string(),
})

export const newSaleSchema = z
  .object({
    clientId: z.string().nullable(),
    paymentType: z.string().min(1, 'Forma de pagamento não selecionada'),
    products: z.array(prodSchema),
    totalValue: z.number(),
  })
  .refine(({ products }) => products.length !== 0, {
    message: 'Nenhum produto selecionado',
    path: ['products'],
  })

export type INewSale = z.infer<typeof newSaleSchema>
