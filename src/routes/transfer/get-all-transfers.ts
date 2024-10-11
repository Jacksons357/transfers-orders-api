import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import prisma from '../../lib/prisma'

export async function getAllTransfers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/all-transfers',
    {
      schema: {
        summary: 'Pegar transferencias',
      },
    },
    async (req, reply) => {
      const transfers = await prisma.transfer.findMany({
        include: {
          user: true,
        },
      })

      return transfers
    }
  )
}
