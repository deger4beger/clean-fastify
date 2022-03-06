import fastify from "fastify"
import { FastifyRequest } from "fastify"

declare module 'fastify' {

	interface FastifyRequest {
        throwError<T = unknown>(statusCode: number, message: T, thrownError?: Error): void
    }

}