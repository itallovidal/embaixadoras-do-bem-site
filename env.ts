import { envSchema } from '@/types/schemas/env.schema'

const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) throw new Error('Local variables error.')

export const env = envParsed.data
