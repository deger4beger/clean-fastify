import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';
import { WebsocketHandler } from "fastify-websocket"

import { Session } from '../../../lib/session';

const commonRoom: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {

	instance.decorateRequest("connections", new Session())
	console.log("### init route")

	instance.get(
		"/common",
		{
			websocket: true,
			preHandler: [instance.authGuard]
		},
		wsHandler
	)
}

const wsHandler: WebsocketHandler = async function(
	conn,
	req
): Promise<any> {

	console.log("###", req.connections)
	const ws = conn.socket
	const connections = req.connections!
	const { id: userId } = req.user!

	connections.addOne(userId, conn)

	ws.on("message", message => {
		connections.sendAll(message)
	})

	ws.on("close", () => {
		connections.removeOne(userId)
	})

}

export default commonRoom