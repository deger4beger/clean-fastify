import fastify from "fastify"
import { File } from "fastify-multer/src/interfaces"
import { FastifyRequest } from "fastify"

import { SessionStore } from '../lib/session';
import { User } from '../lib/orm/entity';

declare module 'fastify' {

	interface FastifyInstance {
        authGuard(request: FastifyRequest, reply: FastifyReply): void
        adminGuard(request: FastifyRequest, reply: FastifyReply): void
    }

	interface FastifyRequest {
		user?: User
		file?: File
		files?: any // some type inside multer
		connections?: SessionStore
        throwError<T = unknown>(statusCode: number, message: T, thrownError?: Error): void
    }

}