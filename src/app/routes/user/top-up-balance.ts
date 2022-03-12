import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm'

import { RequestHandler } from 'types'
import { UserDTO, UserRequestChangeUsernameBody } from 'types';
import { Paycard, User } from '../../../lib/orm/entity';
import { inMemoryMulter } from '../../../lib/multer';
import { uploadPicture } from '../../../lib/cloudinary';
import { UserRequestTopUpBalanceBody, UserResponseChangeAvatar, UserResponseTopUpBalance } from '../../../types';

const topUpBalance: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "PATCH",
		url: "/balance",
		preHandler: [instance.authGuard],
		schema,
		handler
	})
}

const handler: RequestHandler<UserRequestTopUpBalanceBody> = async function(
	req,
	res
): Promise<any> {

	const paycardRepository = getConnection().getRepository(Paycard)
	const { id: owner } = req.user

	const user = await paycardRepository.findOne({where: { owner }})

	console.log(user)

}

const schema = {
	tags: ["User"],
	body: {
		type: "object",
		properties: {
			balanceToAdd: {
				type: "number"
			}
		},
		required: ["balanceToAdd"]
	},
	response: {
        200: {
            type: "object",
            properties: {
                balance: { type: "string" }
            },
        },
    },
    security: [
      	{
        	"bearer": []
      	}
    ]
}

export default topUpBalance