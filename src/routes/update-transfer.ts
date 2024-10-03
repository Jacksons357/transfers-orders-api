import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import prisma from "../lib/prisma"

export async function updateTransfer(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().patch('/transfer/:transferId', {
    schema: {
      params: z.object({
        transferId: z.string().cuid()
      }),
      body: z.object({
        product: z.string(),
        code: z.string(),
        quantity: z.string(),
        lote: z.string(),
        validate: z.string(),
        destination: z.string(),
        createdAt: z.coerce.date(),
        updateAt: z.coerce.date()
      })
    }
  }, async (request) => {
    const { transferId } = request.params

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

    const transfer = await prisma.transfer.findUnique({
      where: {
        id: transferId
      }
    })

    await prisma.transfer.update({
      where: {
        id: transferId
      },
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

    return { transferId: request.params.transferId }

  })
}