import { Params } from '../../domain/types/common.interface';
import getEntityManager from '../../kernel/db'
import { UserRepository } from '../../domain/auth/user.repository';

import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class UserRepositoryImpl implements UserRepository {

    async findByUsername({ username }: Params) {
        const em = await getEntityManager()
        const result = await em.query('SELECT id, name, role, username, email, password FROM user WHERE username = ?', username)
        console.log(result);
        if (result.length === 0) {
            return null
        }
        const { id, ...userInfo } = result[0]
        return { id, ...userInfo }
    }

    async findByEmail({ email }: Params) {
        const em = await getEntityManager()
        const result = await em.query('SELECT id, name, role, username, email, password FROM user WHERE email = ?', email)
        console.log(result);
        if (result.length === 0) {
            return null
        }
        const { id, ...userInfo } = result[0]
        return { id, ...userInfo }
    }

    async insert({ ...userInfo }: Params) {
        const em = await getEntityManager()
        const result = await em
            .query('INSERT INTO user SET ?', userInfo);
        console.log(result);
        const { ...insertedInfo } = userInfo
        return { id: result.insertId, ...insertedInfo }
    }
}
