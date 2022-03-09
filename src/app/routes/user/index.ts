import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'

import getAll from './get-all'
import changeUsername from './change-username';

const user: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(getAll)
	instance.register(changeUsername)
}

export default user