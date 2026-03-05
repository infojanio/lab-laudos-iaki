import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string().trim().url(),
})

const envVariables = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
}

console.log("ENV URL:", envVariables.VITE_API_URL)

const parsed = envSchema.safeParse(envVariables)

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.format())
  throw new Error("Invalid environment variables.")
}

export const env = parsed.data