import fastify, { FastifyInstance } from "fastify"
import fastifyCors from "fastify-cors"
import helmet from "fastify-helmet"
import config from '../lib/config';
import { IncomingMessage, Server, ServerResponse } from 'http';

import { throwError } from './decorators';
import { routes } from './routes';

export class FastifyCore {

	private readonly server: FastifyInstance<Server, IncomingMessage, ServerResponse>

	constructor() {

		this.server = fastify()

		// Core plugins
		this.server.register(helmet)
		this.server.register(fastifyCors)

		// Decorators
		this.server.decorateRequest("throwError", throwError)

		// Routes
		this.server.register(routes)

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