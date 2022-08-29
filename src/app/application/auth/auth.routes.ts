import { Router } from 'express';
import makeExpressCallback from '../_common/express-callback/index'
import { AuthController } from './auth.controller'

const
    authRouter = Router(),
    authController = AuthController()
    ;

authRouter.post('/login', makeExpressCallback(authController.login))
authRouter.post('/register', makeExpressCallback(authController.register))

export default authRouter;
