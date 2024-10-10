import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from '../../schemas/userSchema'
import type z from 'zod'
import prisma from '../../lib/prisma'
import { auth } from '../../middleware/auth'

export async function getUser(app: FastifyInstance) {
  app.decorateRequest('getCurrentUserId')
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/user',
      {
        schema: {
          summary: 'Get authentication user',
        },
      },
      async (req: FastifyRequest, reply: FastifyReply) => {
        const userId = await req.getCurrentUserId()

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new Error('User not found!')
        }

        return reply.send({ user })
      }
    )
}
