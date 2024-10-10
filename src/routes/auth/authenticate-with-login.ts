import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userSchema } from '../../schemas/userSchema'
import z from 'zod'
import prisma from '../../lib/prisma'
import { verifyPassword } from '../../utils/hash'

export async function authenticateWithLogin(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/login',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with username and password',
        body: userSchema,
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { username, password } = req.body as z.infer<typeof userSchema>

      const user = await prisma.user.findUnique({
        where: { username },
      })

      if (!user) {
        return reply
          .status(400)
          .send({ error: 'User not found or invalid credentials' })
      }

      const isPasswordValid = await verifyPassword(password, user.password)

      if (!isPasswordValid) {
        return reply
          .status(400)
          .send({ error: 'User not found or invalid credentials' })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '1d',
          },
        }
      )

      return reply.status(201).send(token)
    }
  )
}
