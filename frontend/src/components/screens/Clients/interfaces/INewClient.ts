import { z } from 'zod'

export const newClientSchema = z.object({
  name: z.string().min(1, 'Nome do cliente não foi informado'),
  cpf: z.string(),
  phone: z.string().min(1, 'Telefone do cliente não foi informado'),
  email: z.string(),
  _id: z.string().optional(),
})

export type INewClient = z.infer<typeof newClientSchema>
