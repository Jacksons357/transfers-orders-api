import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from '../../@types/schema'
import type z from 'zod'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        body: userSchema,
      },
    },
    async (request, reply) => {
      const { username, password } = request.body as z.infer<typeof userSchema>

      try {
        const user = await prisma.user.findUnique({
          where: { username },
        })

        console.log('Fetched user:', user)

        if (!user) {
          return reply.status(401).send({ error: 'User invalid ' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        console.log('Password provided:', password)
        console.log('Stored password:', user.password)

        if (!isPasswordValid) {
          return reply.status(401).send({ error: 'User or password invalid' })
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET as string,
          { expiresIn: '4h' }
        )

        reply.send({ token })
      } catch (error) {
        console.error('Error loggin in: ', error)
        return reply.status(500).send({ error: 'Error logging in' })
      }
    }
  )
}
