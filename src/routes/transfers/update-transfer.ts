import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import prisma from '../../lib/prisma'

const transferIdSchema = z.object({
  transferId: z.string().cuid(),
})

const transferSchema = z.object({
  status: z.string(),
})

export async function updateTransfer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/transfer/:transferId',
    {
      schema: {
        params: transferIdSchema,
        body: transferSchema,
      },
    },
    async (request, reply) => {
      const { transferId } = request.params as z.infer<typeof transferIdSchema>

      const { status } = request.body as z.infer<typeof transferSchema>

      const transfer = await prisma.transfer.findUnique({
        where: {
          id: transferId,
        },
      })

      if (!transfer) {
        return reply.status(404).send({ error: 'Transfer not found ' })
      }

      const updateTransfer = await prisma.transfer.update({
        where: {
          id: transferId,
        },
        data: {
          status,
        },
      })

      return { updateTransfer }
    }
  )
}
