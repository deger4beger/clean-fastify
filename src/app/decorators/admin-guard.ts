import httpCodes from "@inip/http-codes"
import { preHandlerHookHandler } from "fastify"

import { UserDTO } from '../../types';

const adminGuard: preHandlerHookHandler = async function(
    request,
    reply
): Promise<void> {
    const user: UserDTO = request.user

    if (!user) {
        throw request.throwError(httpCodes.UNAUTHORIZED, "Not authorized")
    }

    if (user.email !== "admin@admin") {
        throw request.throwError(httpCodes.UNAUTHORIZED, "Not authorized")
    }

}

export default adminGuard