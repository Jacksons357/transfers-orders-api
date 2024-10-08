import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import prisma from '../../lib/prisma'

export async function deleteUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/user/:username', async (request, reply) => {
      const { username } = request.params as { username: string }

      const user = await prisma.user.delete({
        where: { username },
      })

      return 'User deleted'
    })
}
