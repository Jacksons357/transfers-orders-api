import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import prisma from '../../lib/prisma'
import { userIdSchema } from '../../@types/schema'
import type z from 'zod'

export async function getUserId(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/user/:userId',
    {
      schema: {
        params: userIdSchema,
      },
    },
    async (request, reply) => {
      const { userId } = request.params as z.infer<typeof userIdSchema>

      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        })

        if (!user) {
          return reply.status(404).send({ error: 'User not found' })
        }

        reply.send(user)

        return user
      } catch (error) {
        return reply.status(500).send({ error: 'Error fetching user' })
      }
    }
  )
}
