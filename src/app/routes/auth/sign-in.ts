import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm'

import { RequestHandler, UserRequestSigninBody } from 'types'
import { User } from '../../../lib/orm/entity';
import { Jwt } from 'types';
import { getSignedToken } from '../../../lib/jwt';

const signin: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "POST",
		url: "/signin",
		schema,
		handler
	})
}

const handler: RequestHandler<UserRequestSigninBody> = async function(
	req,
	res
): Promise<{
	token: Jwt
}> {

	const signinPaylad = req.body
	const userRepository = getConnection().getRepository(User)

	const userExists = await userRepository.findOne({
		where: {
			email: signinPaylad.email
		}
	})

	if (!userExists) {
		throw req.throwError(httpCodes.NOT_FOUND, "User doesn't exist")
	}

	try {
		await userExists.comparePassword(signinPaylad.password)
	} catch (err: any) {
		throw req.throwError(httpCodes.BAD_REQUEST, "Auth failed")
	}

	return {
		token: getSignedToken(userExists)
	}

}

const schema = {
	tags: ["Authentication"],
	body: {
		type: "object",
		properties: {
			email: { type: "string" },
			password: { type: "string" }
		},
		required: ["email", "password"]
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

export default signin