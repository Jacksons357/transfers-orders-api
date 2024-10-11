import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userIdSchema } from '../../schemas/userSchema'
import prisma from '../../lib/prisma'
import type z from 'zod'

export async function deleteUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/user/:userId',
    {
      schema: {
        params: userIdSchema,
      },
    },
    async (request, reply) => {
      const { userId } = request.params as z.infer<typeof userIdSchema>

      try {
        const deletedUser = await prisma.user.delete({
          where: { id: userId },
        })

        reply.status(200).send({ success: true, data: deletedUser })
      } catch (error) {
        reply.status(404).send({ success: false, message: 'User not found' })
      }
    }
  )
}
