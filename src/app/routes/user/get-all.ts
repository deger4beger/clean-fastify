import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler } from 'types'
import { User } from '../../../lib/orm/entity';
import { PaginationParams, UserDTO } from '../../../types';

const getAll: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "GET",
		url: "/",
		schema,
		handler
	})
}

const handler: RequestHandler<null, PaginationParams> = async function(
	req,
	res
): Promise<UserDTO[]> {

	const userRepository = getConnection().getRepository(User)
	const { page=1, limit=25 } = req.params

	const users = await userRepository.find({
		skip: limit * (page - 1),
		take: limit
	})

	return users.map(user => {
		return user.toResultObject()
	})

}

const schema = {
	tags: ["User"],
	params: {
		type: "object",
		properties: {
			take: { type: "number", },
			limit: { type: "number" },
		},
		required: []
	},
	response: {
        200: {
            type: "array",
            items: {
            	type: "object",
            	properties: {
                	id: { type: "string" },
                	email: { type: "string" },
                	username: { type: "string" }
            	}
            }
        },
    }
}

export default getAll