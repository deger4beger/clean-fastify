import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';
import { WebsocketHandler, RouteOptions } from "fastify-websocket"

import { BillDTO } from '../../../types';
import { commonBillScheme } from '../../schemes';
import { Bill } from '../../../lib/orm/entity';

const commonRoom: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
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

	const ws = conn.socket

	// ws.send(conn.listenerCount("open"))

	ws.on("message", message => {
		ws.send(message)
	})

}

export default commonRoom