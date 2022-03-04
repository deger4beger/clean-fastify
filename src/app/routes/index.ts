import { FastifyPlugin } from "fastify"
import { health } from '../plugins';

export const routes: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
}