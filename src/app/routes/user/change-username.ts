import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler } from 'types'
import { User } from '../../../lib/orm/entity';
import { PaginationParams, UserDTO } from '../../../types';

const changeUsername: FastifyPlugin = async function(
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
): Promise<any> {

	const userRepository = getConnection().getRepository(User)

}

const schema = {
	params: {
		type: "object",
		properties: {
			take: { type: "number" },
			limit: { type: "number" },
		}
	},
	response: {
        200: {
            type: "array",
            properties: {
                id: { type: "string" },
                email: { type: "string" },
                username: { type: "string" }
            },
        },
    }
}

export default changeUsername