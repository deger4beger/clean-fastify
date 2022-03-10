import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler, UserRequestSignupBody } from 'types'
import { Jwt } from '../../../types/jwt';
import { User } from '../../../lib/orm/entity';
import { getSignedToken } from '../../../lib/jwt';

const signup: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "POST",
		url: "/signup",
		schema,
		handler
	})
}

const handler: RequestHandler<UserRequestSignupBody> = async function(
	req,
	res
): Promise<{
	token: Jwt
}> {

	const signupPaylad = req.body
	const userRepository = getConnection().getRepository(User)

	const userExists = await userRepository.findOne({
		where: {
			email: signupPaylad.email
		}
	})

	if (!!userExists) {
		throw req.throwError(httpCodes.BAD_REQUEST, "User already exists")
	}

	const newUser = userRepository.create(signupPaylad)

	try {
		await userRepository.save(newUser)
	} catch (err: any) {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	return {
		token: getSignedToken(newUser)
	}

}

const schema = {
	tags: ["Authentication"],
	body: {
		type: "object",
		properties: {
			username: { type: "string" },
			email: { type: "string" },
			password: { type: "string" }
		},
		required: ["email", "username", "password"]
	},
	response: {
        200: {
            type: "object",
            properties: {
                token: {
                    type: "string",
                },
            },
        },
    }
}

export default signup