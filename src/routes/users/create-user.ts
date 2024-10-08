import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from '../../@types/schema'
import type z from 'zod'
import prisma from '../../lib/prisma'
import bcript from 'bcrypt'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/user',
    {
      schema: {
        body: userSchema,
      },
    },
    async (request, reply) => {
      const { username, password } = request.body as z.infer<typeof userSchema>

      try {
        const existingUser = await prisma.user.findUnique({
          where: { username },
        })

        if (existingUser) {
          return reply.status(400).send({ error: 'Username already exists' })
        }
        const hashedPassword = await bcript.hash(password, 10)

        const user = await prisma.user.create({
          data: {
            username,
            password: hashedPassword,
          },
        })

        reply.status(201).send(user)
        return { userId: user.id }
      } catch (error) {
        console.error('error creating user: ', error)
        return reply.status(500).send({ error: 'Error create a user ' })
      }
    }
  )
}
