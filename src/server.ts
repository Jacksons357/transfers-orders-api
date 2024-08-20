import fastify from 'fastify'
import { createTransfer } from './routes/create-transfer'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { getTransfers } from './routes/get-transfers';
import { updateTransfer } from './routes/update-transfer';
import { deleteTransfer } from './routes/delete-transfer';

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTransfer)
app.register(getTransfers)
app.register(updateTransfer)
app.register(deleteTransfer)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})