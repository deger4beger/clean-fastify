import fastify from "fastify"
import { FastifyRequest } from "fastify"

import { UserDTO } from '../types';

declare module 'fastify' {

	interface FastifyInstance {
        authGuard(request: FastifyRequest, reply: FastifyReply): void
    }

	interface FastifyRequest {
		user: UserDTO
        throwError<T = unknown>(statusCode: number, message: T, thrownError?: Error): void
    }

}