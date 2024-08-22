import { z } from 'zod'

export const newClientSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  phone: z.string(),
  email: z.string(),
  _id: z.string().optional(),
})

export type INewClient = z.infer<typeof newClientSchema>
