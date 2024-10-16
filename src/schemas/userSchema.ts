import z from 'zod'

export const transferSchema = z.object({
  product: z.string().optional(),
  code: z.string(),
  quantity: z.coerce.string(),
  lote: z.string().optional(),
  validate: z.string().optional(),
  destination: z.string(),
  userId: z.string().optional(),
})

export const userSchema = z.object({
  codename: z.string().optional(),
  username: z.string().min(1),
  password: z.string().min(1),
})

export const userIdSchema = z.object({
  userId: z.string(),
})

export const typeTransferId = z.object({
  transferId: z.string().cuid(),
})

export const typeStatusTransfer = z.object({
  status: z.enum(['pending', 'sent']),
})
