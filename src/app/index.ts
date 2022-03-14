import "../augmentations/fastify"
import fastify, { FastifyInstance } from "fastify"
import fastifyCors from "fastify-cors"
import helmet from "fastify-helmet"
import multer from "fastify-multer"
import config from '../lib/config'
import { IncomingMessage, Server, ServerResponse } from 'http'

import { requestSerializer, responseSerializer } from './serializers'
import { authGuard, throwError } from './decorators'
import { routes } from './routes'
import { bearer } from './plugins'
import adminGuard from './decorators/admin-guard';

export class FastifyCore {

	private readonly server: FastifyInstance<Server, IncomingMessage, ServerResponse>

	constructor() {

		this.server = fastify({
			logger: {
				level: config.logger.level,
                prettyPrint: config.logger.prettyPrint,
                redact: ["req.headers.authorization"],
                serializers: {
                    res: responseSerializer,
                    req: requestSerializer,
                },
			} as any
		})

		// Core plugins
		this.server.register(helmet, config.helmet)
		this.server.register(multer.contentParser)
		this.server.register(fastifyCors)

		// Documentation
		this.server.register(require("fastify-swagger"), {
			routePrefix: "/doc",
			swagger: config.swagger,
			exposeRoute: true
		})

		// Custom plugins
		this.server.register(bearer)

		// Decorators
		this.server.decorateRequest("throwError", throwError)
		this.server.decorate("authGuard", authGuard)
		this.server.decorate("adminGuard", adminGuard)

		// Routes
		this.server.register(routes)

		this.server.ready(() => {
			console.log(this.server.printRoutes())
		})

	}

	async listen(): Promise<unknown> {
		try {
			return this.server.listen(config.port, "0.0.0.0")
		} catch (err) {
			this.server.log.error(err)
			process.exit(1)
		}
	}

}