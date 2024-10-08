import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userIdSchema } from '../../@types/schema'
import type z from 'zod'
import prisma from '../../lib/prisma'

export async function getUserTransfers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/transfers',
    {
      schema: {
        params: userIdSchema,
      },
    },
    async (request, reply) => {
      const { userId } = request.params as z.infer<typeof userIdSchema>

      try {
        const transfers = await prisma.transfer.findMany({
          where: { userId },
        })
        reply.send(transfers)
      } catch (error) {
        return reply.status(500).send({ error: 'Error fetching transfers' })
      }
    }
  )
}
