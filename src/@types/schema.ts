import z from 'zod'

export const transferSchema = z.object({
  product: z.string(),
  code: z.string(),
  quantity: z.coerce.string(),
  lote: z.string(),
  validate: z.string(),
  destination: z.string(),
  userId: z.string(),
})

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const userIdSchema = z.object({
  userId: z.string(),
})
