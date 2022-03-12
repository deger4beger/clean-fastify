import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'

import getAll from './get-all'
import changeUsername from './change-username';
import getUserInfo from './get-user-info';

const user: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)
	instance.register(getAll)
	instance.register(changeUsername)
	instance.register(getUserInfo)
}

export default user