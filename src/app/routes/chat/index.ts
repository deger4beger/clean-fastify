import { FastifyPlugin } from "fastify"
import { health } from '../../plugins'



const chat: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.register(health)

}

export default chat