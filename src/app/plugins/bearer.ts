import httpCodes from "@inip/http-codes"
import { preHandlerHookHandler, FastifyPlugin } from "fastify"
import { JwtPayload } from 'jsonwebtoken'
import { getConnection } from 'typeorm'
import fp from "fastify-plugin"

import { validateToken } from '../../lib/jwt'
import { User } from '../../lib/orm/entity'
import { UserDTO } from '../../types';

const bearerPlugin: FastifyPlugin = async function(
    instance,
    options,
    done
): Promise<void> {
    instance.decorateRequest("user", null)
    instance.addHook('preHandler', bearerHook)
}

const bearerHook: preHandlerHookHandler = async function(
    request,
    reply
): Promise<void> {
    const authHeader = request.headers["authorization"]
    if (!authHeader) {
        return
    }

    const [scheme, token] = authHeader.split(/\s+/)
    if (scheme.toLowerCase() !== 'bearer') {
        throw request.throwError( httpCodes.BAD_REQUEST, "Invalid bearer scheme")
    }

    let decodedToken: JwtPayload & UserDTO
    try {
        decodedToken = validateToken(token)
    } catch (error) {
        throw request.throwError(httpCodes.UNAUTHORIZED, "Not authorized")
    }

    const userRepository = getConnection().getRepository(User)
    const user = await userRepository.findOne({
        where: {
            email: decodedToken.email
        }
    })

    if (!user) {
        throw request.throwError(httpCodes.UNAUTHORIZED, "Not authorized")
    }

    request.user = user
}

const bearer = fp(bearerPlugin)

export default bearer