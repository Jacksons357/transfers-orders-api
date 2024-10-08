import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { z } from 'zod'
import prisma from '../../lib/prisma'
import { transferSchema } from '../../@types/schema'

export async function createTransfer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/transfers',
    {
      schema: {
        body: transferSchema,
      },
    },
    async (request, reply) => {
      const { product, code, quantity, lote, validate, destination, userId } =
        request.body as z.infer<typeof transferSchema>

      const transfer = await prisma.transfer.create({
        data: {
          product,
          code,
          quantity,
          lote,
          validate,
          destination,
          status: 'pending',
          user: {
            connect: { id: userId },
          },
        },
      })

      return { transferId: transfer.id }
    }
  )
}
