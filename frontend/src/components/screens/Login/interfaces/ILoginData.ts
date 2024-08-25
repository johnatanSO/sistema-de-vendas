import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'E-mail não informado'),
  password: z.string().min(1, 'Senha não informada'),
})

export type ILoginData = z.infer<typeof loginSchema>
