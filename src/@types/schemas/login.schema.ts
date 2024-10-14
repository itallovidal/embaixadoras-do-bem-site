import z from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email({ message: 'Preencha com um e-mail válido' }),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' }),
})

export type TLoginSchema = z.infer<typeof loginSchema>
