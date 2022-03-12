import cloudinary, { UploadApiResponse } from "cloudinary"
import config from '../config'

cloudinary.v2.config(config.cloudinary)

export function uploadPicture(content: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
            {
                folder: "clean-fastify",
				// eager : [{ width : 400, height : 400, crop : 'crop', gravity : 'face'}]
		    }, (error, result) => {
                if (error) {
                    reject("Upload failed")
				} else if (result) {
                    resolve(result)
                } else {
                	reject("Internal server error")
                }
            }
        ).end(content)
    })
}