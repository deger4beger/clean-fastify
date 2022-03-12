import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm'

import { RequestHandler } from 'types'
import { UserDTO, UserRequestChangeUsernameBody } from 'types';
import { User } from '../../../lib/orm/entity';
import { inMemoryMulter } from '../../../lib/multer';
import { uploadPicture } from '../../../lib/cloudinary';

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

	const userRepository = getConnection().getRepository(User)
	const binaryAvatar = req.file?.buffer as Buffer
	const userEmail = req.user.email

	const user = await userRepository.findOne({
		where: {
			email: userEmail
		},
		relations: ["profile"]
	}) as User

	const uploadResult = await uploadPicture(binaryAvatar)
	user.profile.avatarUrl = uploadResult.secure_url

	try {
		await userRepository.save(user)
	} catch {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	return "seuc"

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