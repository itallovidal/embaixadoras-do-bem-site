import { z } from 'zod'

export const envValidation = z.object({
  FIREBASE_APP_ID: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  JWT_SECRET: z.string(),
  MAILTRAP_TOKEN: z.string(),
})

const envParsed = envValidation.safeParse(process.env)

if (!envParsed.success) throw new Error('Local variables error.')

export const env = envParsed.data
