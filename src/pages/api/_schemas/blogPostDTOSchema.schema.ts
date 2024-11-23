import z from 'zod'

export const blogPostDTOSchema = z.object({
  title: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(4, { message: 'Mínimo de 4 letras.' }),
  text: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(4, { message: 'Mínimo de 4 letras.' }),
  author: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  tagId: z.string(),
})

export type TBlogPostSchema = z.infer<typeof blogPostDTOSchema>
