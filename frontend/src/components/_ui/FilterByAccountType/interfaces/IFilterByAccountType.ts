import { z } from 'zod'

export const filterByAccountTypeSchema = z.object({
  accountType: z.string(),
})

export type IFilterByAccountType = z.infer<typeof filterByAccountTypeSchema>
