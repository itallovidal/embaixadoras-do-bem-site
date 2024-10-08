import z from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório' }),
  startDate: z.date(),
  endDate: z.date().optional(),
  isActive: z.boolean(),
  description: z.string().min(1, { message: 'Campo obrigatório' }),
  images: z
    .any()
    .array()
    .refine((value) => value.length > 0, { message: 'Minimo de 1 imagem' }),
})

export type TCreateProjectSchema = z.infer<typeof createProjectSchema>
