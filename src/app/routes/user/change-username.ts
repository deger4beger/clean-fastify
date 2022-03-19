import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler } from 'types'
import { User } from '../../../lib/orm/entity';
import { UserDTO, UserRequestChangeUsernameBody } from '../../../types';

export const changeUsername: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "PATCH",
		url: "/username",
		preHandler: [instance.authGuard],
		schema,
		handler
	})
}

export const handler: RequestHandler<UserRequestChangeUsernameBody> = async function(
	req,
	res
): Promise<UserDTO> {

	const userRepository = getConnection().getRepository(User)
	const { username } = req.body
	const email = req.user!.email

	try {
		await userRepository.update({ email }, { username })
	} catch (err) {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	const updatedUser = await userRepository.findOne({where: { email } }) as User

	return updatedUser.toResultObject()

}

const schema = {
	tags: ["User"],
	body: {
		type: "object",
		properties: {
			username: { type: "string" }
		}
	},
	response: {
        200: {
            type: "object",
            properties: {
                id: { type: "string" },
                email: { type: "string" },
                username: { type: "string" }
            },
        },
    },
    security: [
      	{
        	"bearer": []
      	}
    ]
}