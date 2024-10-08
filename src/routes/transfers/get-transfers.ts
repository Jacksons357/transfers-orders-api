import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import prisma from '../../lib/prisma'

export async function getTransfers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/', async () => {
    const transfers = await prisma.transfer.findMany({
      orderBy: {
        status: 'asc',
      },
    })

    return { transfers }
  })
}
