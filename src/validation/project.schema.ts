import z from 'zod'

export const projectSchema = z
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
  .refine((value) => value.endDate || value.isActive !== undefined, {
    path: ['isActive'],
    message: 'Escolha uma data final ou marque como vigente.',
  })

export type TProjectSchema = z.infer<typeof projectSchema>
