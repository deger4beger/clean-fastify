import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm'

import { RequestHandler } from 'types'
import { Profile } from '../../../lib/orm/entity';
import { inMemoryMulter } from '../../../lib/multer';
import { uploadPicture } from '../../../lib/cloudinary';
import { UserResponseChangeAvatar } from '../../../types';

export const changeAvatar: FastifyPlugin = async function(
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

export const handler: RequestHandler = async function(
	req,
	res
): Promise<UserResponseChangeAvatar> {

	const profileRepository = getConnection().getRepository(Profile)
	const binaryAvatar = req.file?.buffer as Buffer
	const owner = req.user!.id

	const profile = await profileRepository.findOne({where: { owner }}) as Profile

	const uploadResult = await uploadPicture(binaryAvatar)
	const url = uploadResult.secure_url
	profile.avatarUrl = url

	try {
		await profileRepository.save(profile)
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