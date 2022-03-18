import { SocketStream } from "fastify-websocket"

interface connectionStore {
	[id: string]: SocketStream
}

export class Session {

	private allConnected: connectionStore

	constructor() {
		this.allConnected = {}
	}

	addOne(userId: string, session: SocketStream): void {
		this.allConnected[userId] = session
	}

	removeOne(userId: string): void {
		delete this.allConnected[userId]
	}

	sendAll(message) {
		Object.values(this.allConnected).forEach(conn => {
			conn.socket.send(message)
		})
	}

}