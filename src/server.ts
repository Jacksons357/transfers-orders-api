import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import cors from '@fastify/cors'
import { createUser } from './routes/user/create-user'
import { createTransfer } from './routes/transfer/create-transfer'
import { login } from './routes/login/login'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { authenticateWithLogin } from './routes/auth/authenticate-with-login'
import fastifyJwt from '@fastify/jwt'
import { getUser } from './routes/user/get-user'
import { getAllTransfers } from './routes/transfer/get-all-transfers'
import { getAllUsers } from './routes/user/get-all-users'
import { createTransferUserId } from './routes/transfer/create-transfer-user-id'
import { getTransferUserId } from './routes/transfer/get-transfer-user-id'
import { deleteTransfer } from './routes/transfer/delete-transfer'
import { updateStatusTransfer } from './routes/transfer/update-status-transfer'
import { deleteUser } from './routes/user/delete-user'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API-Transfers',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(fastifyJwt, {
  secret: 'my-jwt-secret',
})

server.register(createUser)
server.register(createTransfer)
server.register(login)
server.register(authenticateWithLogin)
server.register(getUser)
server.register(getAllTransfers)
server.register(createTransferUserId)
server.register(getTransferUserId)
server.register(deleteTransfer)
server.register(updateStatusTransfer)
server.register(deleteUser)

server.register(getAllUsers)

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
})

server.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})
