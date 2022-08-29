import httpStatus from 'http-status';
import { container } from '../inversify.config';
import { AuthService } from '../../domain/auth/auth.service';
import { TYPES } from '../../domain/_types/index';

function AuthController() {
    return Object.freeze({
        login: async (req: any) => {
            try {
                const authService = container.get<AuthService>(TYPES.AuthService);
                const { email, password } = req.body
                const login = await authService.login({
                    email,
                    password
                })
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.OK,
                    body: { login }
                }
            } catch (e: any) {
                // TODO: Error logging
                console.log(e)

                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        },

        register: async (req: any) => {
            try {
                const authService = container.get<AuthService>(TYPES.AuthService);
                const { ...userInfo } = req.body
                const register = await authService.register({
                    ...userInfo,
                })
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.CREATED,
                    body: { register }
                }
            } catch (e: any) {
                // TODO: Error logging
                console.log(e)

                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        }
    });
}

export { AuthController }
