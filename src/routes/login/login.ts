import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from '../../schemas/userSchema'
import type z from 'zod'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { verifyPassword } from '../../utils/hash'
import prisma from '../../lib/prisma'

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        body: userSchema,
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { password, username } = req.body as z.infer<typeof userSchema>

      try {
        const user = await prisma.user.findUnique({
          where: { username },
        })

        if (!user) {
          return reply.status(401).send({ error: 'User not found or invalid' })
        }

        const isValidPassword = await verifyPassword(password, user.password)

        if (!isValidPassword) {
          return reply
            .status(401)
            .send({ error: 'Password not found or invalid credential' })
        }

        const transfers = await prisma.transfer.findMany({
          where: { userId: user.id },
        })

        return reply.status(200).send({ user, transfers })
      } catch (error) {
        console.error('Error during login: ', error)
        return reply.status(500).send({ error: 'Error during login' })
      }
    }
  )
}
