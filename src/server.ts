import fastify from 'fastify'
import { createTransfer } from './routes/transfers/create-transfer'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { getTransfers } from './routes/transfers/get-transfers'
import { updateTransfer } from './routes/transfers/update-transfer'
import { deleteTransfer } from './routes/transfers/delete-transfer'
import cors from '@fastify/cors'
import { createUser } from './routes/users/create-user'
import { getUserTransfers } from './routes/users/get-user-transfer'
import { getUserId } from './routes/users/get-user-id'
import { login } from './routes/login/login'
import { deleteUser } from './routes/users/delete-user'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
})

app.register(createTransfer)
app.register(getTransfers)
app.register(updateTransfer)
app.register(deleteTransfer)

app.register(createUser)
app.register(getUserId)
app.register(deleteUser)

app.register(getUserTransfers)

app.register(login)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})
