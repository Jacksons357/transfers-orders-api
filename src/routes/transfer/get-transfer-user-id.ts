import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { auth } from '../../middleware/auth'
import prisma from '../../lib/prisma'

export async function getTransferUserId(app: FastifyInstance) {
  app.register(auth)
  app.withTypeProvider<ZodTypeProvider>().get(
    '/transfers',
    {
      schema: {
        summary: 'Get transfer with userId Logged',
      },
    },
    async (req, reply) => {
      const userId = await req.getCurrentUserId()

      try {
        const transfers = await prisma.transfer.findMany({
          where: { userId },
          orderBy: {
            status: 'asc',
          },
          select: {
            id: true,
            product: true,
            code: true,
            quantity: true,
            lote: true,
            validate: true,
            destination: true,
            status: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        })

        return reply.status(200).send({ transfers })
      } catch (error) {
        return reply.status(500).send({ error: 'Error fetching transfers' })
      }
    }
  )
}
