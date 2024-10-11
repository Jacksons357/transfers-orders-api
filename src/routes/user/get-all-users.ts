import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import prisma from '../../lib/prisma'

export async function getAllUsers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/all-users',
    {
      schema: {
        summary: 'Get todos usuarios criados',
      },
    },
    async (req, reply) => {
      const users = await prisma.user.findMany()

      return users
    }
  )
}
