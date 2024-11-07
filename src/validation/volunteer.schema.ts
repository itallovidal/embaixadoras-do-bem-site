import { z } from 'zod'

export const volunteerSchema = z.object({
  name: z
    .string({
      required_error: 'Campo Obrigatório',
    })
    .min(3, {
      message: 'Mínimo de 3 caracteres.',
    }),
  profession: z
    .string({
      required_error: 'Campo Obrigatório',
    })
    .min(4, {
      message: 'Mínimo de 4 caracteres.',
    }),
  email: z.string({ required_error: 'Campo Obrigatório' }).email(),
  phone: z
    .string({
      required_error: 'Campo Obrigatório',
    })
    .regex(/^(\d{2})(9\d{8})$/, {
      message: 'Formato Incorreto.',
    }),
})
