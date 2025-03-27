import z from 'zod'

export const collaboratorDTOSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(4, { message: 'Mínimo de 4 letras.' }),

  responsability: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(4, { message: 'Mínimo de 4 letras.' }),
})

export type ICreateCollaboratorDTOSchema = z.infer<typeof collaboratorDTOSchema>
