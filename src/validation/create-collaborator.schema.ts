import z from 'zod'

export const collaboratorSchema = z
    .object({
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
        images: z
            .any()
            .array()
            .refine((value) => value.length > 0, { message: 'Mínimo de 1 imagem' }),
    })

export type TCollaboratorSchema = z.infer<typeof collaboratorSchema>
