import z from 'zod'

export const partnershipSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  image: z.any(),
})

export type TPartnershipSchema = z.infer<typeof partnershipSchema>
