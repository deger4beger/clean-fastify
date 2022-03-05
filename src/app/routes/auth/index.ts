import { FastifyPlugin } from "fastify"

import signup from './signup'
import { health } from '../../plugins';

const auth: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(signup)
}

export default auth