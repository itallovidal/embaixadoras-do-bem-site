import { z } from 'zod'

export const envSchema = z.object({
  FIREBASE_APP_ID: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  JWT_SECRET: z.string(),
})
