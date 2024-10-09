import { z } from 'zod'

export const createProjectDTOSchema = z.object({
  title: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(4, { message: 'Mínimo de 4 letras.' }),
  startDate: z.coerce.date({
    required_error: 'Campo obrigatório.',
  }),
  endDate: z.coerce.date().optional(),
  isActive: z.coerce.boolean().optional(),
  description: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(4, { message: 'Mínimo de 4 letras.' }),
})
