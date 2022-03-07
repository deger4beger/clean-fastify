import fastify from "fastify"
import { FastifyRequest } from "fastify"

import { User } from '../lib/orm/entity'

declare module 'fastify' {

	interface FastifyRequest {
		user: User
        throwError<T = unknown>(statusCode: number, message: T, thrownError?: Error): void
    }

}