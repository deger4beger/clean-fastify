import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'

import { createNew } from './create-new';
import { buyOne } from './buy-one';

export const bill: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(createNew)
	instance.register(buyOne)
}