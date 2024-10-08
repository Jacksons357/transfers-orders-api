import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import prisma from '../../lib/prisma'

export async function deleteTransfer(app: FastifyInstance) {
  const paramsSchema = z.object({
    transferId: z.string().cuid(),
  })

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/transfer/:transferId',
    {
      schema: {
        params: paramsSchema,
      },
    },
    async (request, reply) => {
      const { transferId } = request.params as z.infer<typeof paramsSchema>

      const transfer = await prisma.transfer.findUnique({
        where: {
          id: transferId,
        },
      })

      if (!transfer) {
        return reply.status(404).send('Transfer not found')
      }

      await prisma.transfer.delete({
        where: {
          id: transferId,
        },
      })

      return reply.status(200).send('Transfer removed successfully!')
    }
  )
}
