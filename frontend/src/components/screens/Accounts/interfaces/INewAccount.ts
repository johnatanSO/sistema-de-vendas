import { z } from 'zod'
import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'

export const newAccountSchema = z.object({
  value: z.number().min(1, 'Valor não informado'),
  type: z.nativeEnum(ACCOUNT_TYPE),
  description: z.string().min(1, 'Nenhuma descrição foi informada'),
  category: z.string(),
  _id: z.string().optional(),
})

export type INewAccount = z.infer<typeof newAccountSchema>
