import { FastifyPlugin } from "fastify"

import { RequestHandlerWithParams, UserRequestBody } from 'types'

const signup: FastifyPlugin = async (
	instance,
	options,
	done
): Promise<void> => {
	instance.route({
		method: "POST",
		url: "/signup",
		schema,
		handler
	})
}

const handler: RequestHandlerWithParams<UserRequestBody> = async (
	req,
	res
): Promise<any> => {
	return req.body
}

const schema = {
	body: {
		type: "object",
		properties: {
			username: { type: "string" },
			email: { type: "string" },
			password: { type: "string" }
		},
		required: ["email", "username", "password"]
	}
	// response: {
 //        200: {
 //            type: 'object',
 //            properties: {
 //                token: {
 //                    type: 'string',
 //                },
 //            },
 //        },
 //    }
}

export default signup