import { Params } from '../../domain/_types/common.interface';
import * as jwt from 'jsonwebtoken'
import config from "../../kernel/config";
import { AuthUtil } from '../../domain/auth/auth.util';

import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
class AuthUtilImpl implements AuthUtil {
    async generateToken(user: Params) {
        console.log('user ', user)
        return jwt.sign({
            name: user.name,
            username: user.username,
            role: user.role,
        },
            config.jwt_secret,
            { expiresIn: config.jwt_expires_in }
        )
    }

    async verifyToken(token: string) {
        return jwt.verify(token, config.jwt_secret)
    }
}

export { AuthUtilImpl }
