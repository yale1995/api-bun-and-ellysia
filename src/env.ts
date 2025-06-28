import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string()
})



export const env = envSchema.parse(process.env)