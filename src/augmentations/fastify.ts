import fastify from "fastify"

declare module 'fastify' {

	interface FastifyRequest<> {
        throwError<T>(statusCode: number, message: T, thrownError?: Error): void
    }

}