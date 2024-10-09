import z from 'zod'

export const createProjectSchema = z
  .object({
    title: z
      .string({
        required_error: 'Campo obrigatório.',
      })
      .min(4, { message: 'Mínimo de 4 letras.' }),
    startDate: z.date({
      required_error: 'Campo obrigatório.',
    }),
    endDate: z.date().optional(),
    isActive: z.boolean().optional(),
    description: z
      .string({
        required_error: 'Campo obrigatório.',
      })
      .min(4, { message: 'Mínimo de 4 letras.' }),
    images: z
      .any()
      .array()
      .refine((value) => value.length > 0, { message: 'Mínimo de 1 imagem' }),
  })
  .refine(({ isActive, endDate }) => !(!isActive && endDate === undefined), {
    path: ['isActive'],
    message: 'Escolha uma data final ou marque como vigente.',
  })

export type TCreateProjectSchema = z.infer<typeof createProjectSchema>
