import config from '../config';
import * as jwt from "jsonwebtoken"

import { User } from '../orm/entity/user/user';
import { UserDTO } from '../../types';

export function getSignedToken(user: User): string {
    return jwt.sign(
        getTokenPayload(user),
        config.auth.jwtSecret,
        {
            expiresIn: config.auth.jwtExpires
        }
    )
}

export function validateToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, config.auth.jwtSecret)
}

export default function getTokenPayload(user: User): UserDTO {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    }
}