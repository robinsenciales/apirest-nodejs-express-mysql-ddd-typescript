import * as bcrypt from 'bcryptjs'
import { AuthHelper } from '../../domain/auth/auth.helper'
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
class AuthHelperImpl implements AuthHelper {

    async encrypt(textPlain: string) {
        console.log('textPlain ', textPlain)
        return await bcrypt.hash(textPlain, 10)
    }

    async compare(passwordPlain: string, hashPassword: string) {
        return await bcrypt.compare(passwordPlain, hashPassword)
    }
}

export { AuthHelperImpl };