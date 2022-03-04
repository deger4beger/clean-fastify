import { FastifyPlugin } from "fastify"
import { IncomingMessage, Server } from 'http';
import { FastifyRequestHandler } from '../../types';

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

const handler: FastifyRequestHandler = async (
	req,
	reply
): Promise<void> => {

}

export default health