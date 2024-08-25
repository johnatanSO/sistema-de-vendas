import { z } from 'zod'

const newSupplierSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Informe o nome do fornecedor'),
  cnpj: z.string(),
  phone: z.string(),
  email: z.string(),
})

export type INewSupplier = z.infer<typeof newSupplierSchema>
