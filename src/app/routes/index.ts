import { FastifyPlugin } from "fastify"
import { health } from '../plugins';

import auth from './auth';
import user from './user';
import bill from './bill';

export const routes: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.register(health)
	instance.register(auth, { prefix: "/auth" })
	instance.register(user, { prefix: "/user" })
	instance.register(bill, { prefix: "/bill" })
}