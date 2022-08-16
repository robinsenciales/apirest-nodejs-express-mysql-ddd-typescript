import { Router } from 'express';
import makeExpressCallback from '../express-callback'
import { AuthController } from '../controllers/auth.controller'

const
    authRouter = Router(),
    authController = AuthController()
    ;

authRouter.post('/login', makeExpressCallback(authController.login))
authRouter.post('/register', makeExpressCallback(authController.register))

export default authRouter;
