import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { typeStatusTransfer, typeTransferId } from '../../schemas/userSchema'
import type z from 'zod'
import prisma from '../../lib/prisma'

export async function updateStatusTransfer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/transfer/:transferId',
    {
      schema: {
        params: typeTransferId,
        body: typeStatusTransfer,
      },
    },
    async (request, reply) => {
      const { transferId } = request.params as z.infer<typeof typeTransferId>
      const { status } = request.body as z.infer<typeof typeStatusTransfer>

      try {
        const transfer = await prisma.transfer.findUnique({
          where: { id: transferId },
        })

        if (!transfer) {
          return reply.status(404).send({ error: 'Transfer not found' })
        }

        const updatedTransfer = await prisma.transfer.update({
          where: { id: transferId },
          data: { status },
        })

        return reply.status(200).send(updatedTransfer)
      } catch (error) {
        console.error('Error updating transfer: ', error)
        return reply.status(500).send({ error: 'Error updating transfer' })
      }
    }
  )
}
