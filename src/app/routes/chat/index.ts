import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'

import { commonRoom } from './common-room'

export const chat: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(commonRoom)
}