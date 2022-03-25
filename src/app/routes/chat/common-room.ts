import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';
import { WebsocketHandler } from "fastify-websocket"

import { SessionStore } from '../../../lib/session';
import { Message } from '../../../lib/orm/entity';
import { MessageDTO } from '../../../types';
import {
	onCloseListener,
	onConnectionsCountListener,
	onMessageListener
} from './common-room-events'

export const commonRoom: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {

	instance.decorateRequest("connections", new SessionStore())

	instance.get(
		"/common",
		{
			websocket: true,
			preHandler: [instance.authGuard]
		},
		wsHandler
	)
}

export const wsHandler: WebsocketHandler = async function(
	conn,
	req
): Promise<void> {

	const ws = conn.socket
	const connections = req.connections!
	const { id: userId } = req.user!

	const messageRepository = getConnection().getRepository(Message)

	connections.addOne(userId, conn)

	const messagesHistory = await messageRepository.find({
		take: 25,
		relations: ["sender"]
	})
	ws.send(JSON.stringify(messagesHistory.map(msg => {
		return msg.toResultObject()
	})))

	ws.on("message", async buffer => {
		await onMessageListener(buffer, req, connections, messageRepository)
	})

	ws.on("connectionsCount", () => {
		onConnectionsCountListener(ws, connections)
	})

	ws.on("close", async () => {
		onCloseListener(connections, ws, userId)
	})

}