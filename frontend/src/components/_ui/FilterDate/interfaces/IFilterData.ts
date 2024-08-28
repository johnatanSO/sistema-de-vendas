import { z } from 'zod'

export const filterDateSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
})

export type IFilterDate = z.infer<typeof filterDateSchema>
