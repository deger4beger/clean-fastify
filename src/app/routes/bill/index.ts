import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'

import createNew from './create-new';

const bill: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(createNew)
}

export default bill