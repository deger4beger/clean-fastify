import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'

import getAll from './get-all'

const user: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(getAll)
}

export default user