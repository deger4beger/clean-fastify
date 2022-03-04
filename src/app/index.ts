import fastify, { FastifyInstance } from "fastify"
import fastifyCors from "fastify-cors"
import { IncomingMessage, Server, ServerResponse } from 'http';
import config from 'lib/config'
import { throwError } from './decorators';

export class FastifyCore {

	private readonly server: FastifyInstance<Server, IncomingMessage, ServerResponse>

	constructor() {

		this.server = fastify()

		this.server.register(fastifyCors)

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