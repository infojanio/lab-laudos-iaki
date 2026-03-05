import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
})

const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
}

const parsed = envSchema.safeParse(env)

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.format())
  console.log("ENV RECEBIDA:", env)
  throw new Error("Invalid environment variables.")
}

export default parsed.data