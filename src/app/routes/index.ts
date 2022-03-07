import { FastifyPlugin } from "fastify"
import { health } from '../plugins';
import auth from './auth';

export const routes: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.register(health)
	instance.register(auth, { prefix: "/auth" })
}