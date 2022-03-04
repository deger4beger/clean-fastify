import { FastifyRequest, FastifyReply } from "fastify"

export type FastifyRequestHandler = (req: FastifyRequest, res: FastifyReply) => any