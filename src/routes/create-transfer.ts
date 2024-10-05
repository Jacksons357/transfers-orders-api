import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import prisma from "../lib/prisma"

const transferSchema = z.object({
  product: z.string(),
  code: z.string(),
  quantity: z.coerce.string(),
  lote: z.string(),
  validate: z.string(),
  destination: z.string(),
})

export async function createTransfer(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().post('/transfers', {
    schema: {
      body: transferSchema
    }
  }, async (request) => {
    const { 
      product, 
      code, 
      quantity, 
      lote, 
      validate, 
      destination,
    } = request.body as z.infer<typeof transferSchema>

      const transfer = await prisma.transfer.create({
        data: {
          product, 
          code, 
          quantity, 
          lote, 
          validate, 
          destination,
          status: "pending"
        }
      })

    return { transferId: transfer.id }
  })
}
