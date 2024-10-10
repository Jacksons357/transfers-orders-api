import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { transferSchema } from '../../schemas/userSchema'
import type z from 'zod'
import prisma from '../../lib/prisma'

export async function createTransfer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/transfers',
    {
      schema: {
        body: transferSchema,
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { code, destination, quantity, userId, lote, product, validate } =
        req.body as z.infer<typeof transferSchema>

      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        })

        if (!user) {
          reply.status(404).send({ error: 'User not found' })
        }

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
        return reply.status(500).send({ error: 'Error create transfer' })
      }
    }
  )
}
