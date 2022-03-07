import httpCodes from "@inip/http-codes"
import { preHandlerHookHandler } from "fastify"

import { User } from '../../lib/orm/entity';

const authGuard: preHandlerHookHandler = async function isRegistered(
    request,
    reply
): Promise<void> {
    const user: User = request.user

    if (!user) {
        throw request.throwError(httpCodes.UNAUTHORIZED, "Not authorized")
    }
}

export default authGuard