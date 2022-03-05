import { FastifyPlugin } from "fastify"
import { IncomingMessage, Server } from 'http';

import { RequestHandler } from '../../types';

const health: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.route({
		method: "GET",
		url: "/health",
		handler
	})
}

const handler: RequestHandler = async (
	req,
	reply
): Promise<void> => {
	reply.send("alive")
}

export default health