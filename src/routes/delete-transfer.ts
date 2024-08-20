import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function deleteTransfer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/transfer/:transferId', {
    schema: {
      params: z.object({
        transferId: z.string().cuid()
      })
    }
  }, async (request) => {
    const { transferId } = request.params

    const transfer = await prisma.transfer.findUnique({
      where: {
        id: transferId
      }
    })

    if (!transfer) {
      return 'Transfer not found'
    }

    await prisma.transfer.delete({
      where: {
        id: transferId
      }
    })

    return 'Transfer removed successfully!'

  })
}