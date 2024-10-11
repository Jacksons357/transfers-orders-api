import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { auth } from '../../middleware/auth'
import { transferSchema } from '../../schemas/userSchema'
import type z from 'zod'
import prisma from '../../lib/prisma'

export async function createTransferUserId(app: FastifyInstance) {
  app.register(auth)
  app.withTypeProvider<ZodTypeProvider>().post(
    '/new-transfer',
    {
      schema: {
        body: transferSchema,
      },
    },
    async (req, reply) => {
      const { code, destination, quantity, lote, product, validate } =
        req.body as z.infer<typeof transferSchema>

      const userId = await req.getCurrentUserId()

      if (!userId) {
        return reply.status(401).send({ error: 'Unauthorized' })
      }

      try {
        const transfer = await prisma.transfer.create({
          data: {
            product,
            code,
            destination,
            quantity,
            lote,
            validate,
            user: {
              connect: { id: userId },
            },
          },
        })

        return reply.status(201).send(transfer)
      } catch (error) {
        console.error('Error creating transfer: ', error)
      }
    }
  )
}
