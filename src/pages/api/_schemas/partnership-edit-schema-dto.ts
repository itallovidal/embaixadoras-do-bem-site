import { z } from 'zod'

export const partnershipEditSchemaDto = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  deleteImage: z.string(),
})
