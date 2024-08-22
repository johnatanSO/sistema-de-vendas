import { z } from 'zod'
import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'

export const newAccountSchema = z.object({
  value: z.number().min(0, 'O valor da conta precisa ser maior do que zero'),
  type: z.nativeEnum(ACCOUNT_TYPE),
  description: z.string(),
  category: z.string(),
  _id: z.string().optional(),
})

export type INewAccount = z.infer<typeof newAccountSchema>
