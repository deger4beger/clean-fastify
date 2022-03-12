import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm'

import { RequestHandler } from 'types'
import { UserDTO, UserRequestChangeUsernameBody } from 'types';
import { User } from '../../../lib/orm/entity';
import { inMemoryMulter } from '../../../lib/multer';
import { uploadPicture } from '../../../lib/cloudinary';
import { UserResponseChangeAvatar } from '../../../types';

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
): Promise<UserResponseChangeAvatar> {

	const userRepository = getConnection().getRepository(User)
	const binaryAvatar = req.file?.buffer as Buffer
	const userEmail = req.user.email

	let user = await userRepository.findOne({
		where: {
			email: userEmail
		},
		relations: ["profile"]
	}) as User

	const uploadResult = await uploadPicture(binaryAvatar)
	const url = uploadResult.secure_url
	user.profile.avatarUrl = url

	try {
		await userRepository.save(user)
	} catch {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	return {
		avatarUrl: url
	}

}

const schema = {
	tags: ["User"],
	response: {
        200: {
            type: "object",
            properties: {
                avatarUrl: { type: "string" }
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