import httpCodes from "@inip/http-codes"
import * as WebSocket from "ws"
import { FastifyRequest } from "fastify"

import { MessageDTO } from '../../../types';
import { Repository } from 'typeorm';
import { Message } from '../../../lib/orm/entity';
import { SessionStore } from '../../../lib/session';

export async function onMessageListener(
	buffer: WebSocket.RawData,
	req: FastifyRequest,
	connections: SessionStore,
	messageRepository: Repository<Message>
) {
	const payload: MessageDTO = JSON.parse(buffer.toString())
	let newMessage = messageRepository.create({
		sender: req.user,
		content: payload.content
	})

	try {
		newMessage = await messageRepository.save(newMessage)
	} catch {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	connections.sendAll(JSON.stringify(newMessage.toResultObject()))
}

export function onConnectionsCountListener(
	ws: WebSocket,
	connections: SessionStore
) {
	ws.send(connections.activeUsersCount)
}

export function onCloseListener(
	connections: SessionStore,
	ws: WebSocket,
	userId: string
) {
	connections.removeOne(userId)
	ws.close()
}