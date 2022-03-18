import fastify from "fastify"
import { File } from "fastify-multer/src/interfaces"
import { FastifyRequest } from "fastify"

import { UserDTO } from '../types';
import { Session } from '../lib/session';

declare module 'fastify' {

	interface FastifyInstance {
        authGuard(request: FastifyRequest, reply: FastifyReply): void
        adminGuard(request: FastifyRequest, reply: FastifyReply): void
    }

	interface FastifyRequest {
		user?: UserDTO
		file?: File,
		connections?: Session
        throwError<T = unknown>(statusCode: number, message: T, thrownError?: Error): void
    }

}