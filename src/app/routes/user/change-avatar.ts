import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm'

import { RequestHandler } from 'types'
import { UserDTO, UserRequestChangeUsernameBody } from 'types';
import { User } from '../../../lib/orm/entity';
import { inMemoryMulter } from '../../../lib/multer';

const changeAvatar: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "PATCH",
		url: "/avatar",
		preHandler: [inMemoryMulter.single("file"), instance.authGuard],
		schema,
		handler
	})
}

const handler: RequestHandler = async function(
	req,
	res
): Promise<any> {

	console.log(req.file?.buffer)
	const userRepository = getConnection().getRepository(User)

}

const schema = {
	tags: ["User"],
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

export default changeAvatar