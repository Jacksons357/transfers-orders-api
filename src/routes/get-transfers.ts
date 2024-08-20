import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function getTransfers(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().get('/', 
    async () => {
      const transfers = await prisma.transfer.findMany()

      return { transfers }
  })
}