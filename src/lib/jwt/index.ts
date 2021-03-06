import config from '../config';
import * as jwt from "jsonwebtoken"

import { User } from '../orm/entity/user/user';
import { Jwt, UserDTO } from '../../types';

export function getSignedToken(user: User): Jwt {
    return jwt.sign(
        getTokenPayload(user),
        config.auth.jwtSecret,
        {
            expiresIn: config.auth.jwtExpires
        }
    )
}

export function validateToken(token: string) {
    return jwt.verify(token, config.auth.jwtSecret) as jwt.JwtPayload & UserDTO
}

function getTokenPayload(user: User): UserDTO {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    }
}