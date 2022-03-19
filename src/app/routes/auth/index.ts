import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'

import { signup } from './sign-up'
import { signin } from './sign-in'

export const auth: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(signup)
	instance.register(signin)
}