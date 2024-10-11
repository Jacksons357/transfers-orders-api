import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { transferSchema, type typeTransferId } from '../../schemas/userSchema'
import z from 'zod'
import prisma from '../../lib/prisma'

export async function deleteTransfer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/transfer/:transferId',
    {
      schema: {
        params: z.object({
          transferId: z.string().cuid(),
        }),
      },
    },
    async (request, reply) => {
      const { transferId } = request.params as z.infer<typeof typeTransferId>

      try {
        const transfer = await prisma.transfer.findUnique({
          where: {
            id: transferId,
          },
        })

        if (!transfer) {
          return reply.status(404).send({ error: 'Transfer not found' })
        }

        await prisma.transfer.delete({
          where: { id: transferId },
        })

        return reply.status(204).send()
      } catch (error) {
        console.error('Error deleting transfer: ', error)
        return reply.status(500).send({ error: 'Error deleting transfer' })
      }
    }
  )
}
