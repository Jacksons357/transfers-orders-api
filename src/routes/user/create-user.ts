import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from '../../schemas/userSchema'
import type z from 'zod'
import prisma from '../../lib/prisma'
import { hashPassword } from '../../utils/hash'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create-user',
    {
      schema: {
        summary: 'Create a new User',
        body: userSchema,
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { codename, username, password } = req.body as z.infer<
        typeof userSchema
      >

      try {
        const existingUser = await prisma.user.findUnique({
          where: { username },
        })

        if (existingUser) {
          return reply.status(400).send({ error: 'Username already exists' })
        }

        const user = await prisma.user.create({
          data: {
            codename,
            username,
            password: await hashPassword(password),
          },
        })

        reply.status(201).send(user)
        return { userId: user.id }
      } catch (error) {
        console.error('Error creating user: ', error)
        return reply.status(500).send({ error: 'Error a create a user' })
      }
    }
  )
}
