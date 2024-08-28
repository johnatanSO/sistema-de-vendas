import { z } from 'zod'

export const filterByNameSchema = z.object({
  searchString: z.string(),
})

export type IFilterByName = z.infer<typeof filterByNameSchema>
