import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../lib/prisma"

export async function createTransfer(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().post('/transfers', {
    schema: {
      body: z.object({
        product: z.string(),
        code: z.string(),
        quantity: z.coerce.string(),
        lote: z.string(),
        validate: z.string(),
        destination: z.string(),
        createdAt: z.coerce.date(),
        updateAt: z.coerce.date()
      })
    }
  }, async (request) => {
    const { 
      product, 
      code, 
      quantity, 
      lote, 
      validate, 
      destination,
      createdAt,
      updateAt
    } = request.body

      const transfer = await prisma.transfer.create({
        data: {
          product, 
          code, 
          quantity, 
          lote, 
          validate, 
          destination,
          createdAt,
          updateAt
        }
      })

    return { transferId: transfer.id }
  })
}
