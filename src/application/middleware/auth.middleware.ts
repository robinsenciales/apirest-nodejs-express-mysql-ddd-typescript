import httpStatus from 'http-status'
import { container } from '../inversify.config';
import { AuthUtil } from '../../domain/auth/auth.util';
import { UserRepository } from '../../domain/auth/user.repository';

import { TYPES } from '../../domain/types';

function AuthMiddleware() {

    return Object.freeze({
        checkAuth: async (req: any, res: any, next: any) => {
            try {
                const token = req.headers['authorization'].split(' ').pop();
                const authUtil = container.get<AuthUtil>(TYPES.AuthUtil);
                const tokenData = await authUtil.verifyToken(token);
                if (check(res, tokenData)) {
                    next()
                }
            } catch (e: any) {
                console.log(e)
                if (e.message == 'jwt expired') {
                    expiredToken(res);
                } else {
                    unauthorized(res);
                }
            }
        },

        checkRoleAuth: (roles: any) => async (req: any, res: any, next: any) => {
            try {
                const authUtil = container.get<AuthUtil>(TYPES.AuthUtil);
                const userRepository = container.get<UserRepository>(TYPES.UserRepository);
                const token = req.headers['authorization'].split(' ').pop();
                const tokenData = await authUtil.verifyToken(token);
                const userData = await userRepository.findByUsername({ username: tokenData.username })
                const concat: Array<string> = [].concat(roles);
                if (concat.includes(userData.role)) {
                    next()
                } else {
                    unauthorized(res);
                }
            } catch (e: any) {
                console.log(e)
                if (e.message == 'jwt expired') {
                    expiredToken(res);
                } else {
                    unauthorized(res);
                }
            }
        }
    });

    function check(res: any, tokenData: any) {
        if (!tokenData.name) unauthorized(res);
        return true;
    }

    function unauthorized(res: any) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({ error: 'Access denied' })
        return false;
    }

    function expiredToken(res: any) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({ error: 'Expired token' })
        return false;
    }

}

export { AuthMiddleware }