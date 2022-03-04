import fastify, { FastifyInstance } from "fastify"
import { IncomingMessage, Server, ServerResponse } from 'http';
import fastifyCors from "fastify-cors"
import helmet from "fastify-helmet"
import { throwError } from './decorators';
import config from 'lib/config'

export class FastifyCore {

	private readonly server: FastifyInstance<Server, IncomingMessage, ServerResponse>

	constructor() {

		this.server = fastify()

		// Core plugins
		this.server.register(helmet)
		this.server.register(fastifyCors)

		// Decorators
		this.server.decorateRequest("throwError", throwError)

		this.server.ready(() => {
			console.log(this.server.printRoutes())
		})

	}

	async listen(): Promise<unknown> {
		try {
			return this.server.listen(config.port, "localhost")
		} catch (err) {
			this.server.log.error(err)
			process.exit(1)
		}
	}

}