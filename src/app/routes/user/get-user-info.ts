import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler } from 'types'
import { User } from '../../../lib/orm/entity';
import { UserDTO, UserRequestGetInfoParams } from '../../../types';

const getUserInfo: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "GET",
		url: "/info/:userId",
		schema,
		handler
	})
}

const handler: RequestHandler<null, UserRequestGetInfoParams> = async function(
	req,
	res
): Promise<UserDTO> {

	const userRepository = getConnection().getRepository(User)
	const { userId } = req.params

	const user = await userRepository.findOne({
		where: {
			id: userId
		},
		relations: ["profile", "paycard"]
	})

	if (!user) {
		throw req.throwError(httpCodes.BAD_REQUEST, "User doesn't exists")
	}

	const resultUser = user.toResultObject()
	if (resultUser.id !== req.user?.id) {
		delete resultUser.paycard
	}

	return resultUser

}

const schema = {
	tags: ["User"],
	params: {
		type: "object",
		properties: {
			userId: {
				type: "string",
				format: "uuid"
			}
		}
	},
	response: {
        200: {
            type: "object",
            properties: {
                id: { type: "string" },
                email: { type: "string" },
                username: { type: "string" },
                paycard: {
                	type: "object",
                	properties: {
                		balance: { type: "number" }
                	}
                },
                profile: {
                	type: "object",
                	properties: {
                		avatarUrl: { type: "string" }
                	}
                }
            },
        },
    }
}

export default getUserInfo