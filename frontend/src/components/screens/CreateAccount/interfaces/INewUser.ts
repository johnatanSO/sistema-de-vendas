import { z } from 'zod'

export const newUserSchema = z.object({
  name: z.string().min(1, 'Nome não informado'),
  email: z.string().min(1, 'E-mail não informado'),
  password: z.string().min(1, 'Senha não informada'),
  confirmPassword: z.string().min(1, 'Confirmação de senha não informada'),
})

export type INewUser = z.infer<typeof newUserSchema>
