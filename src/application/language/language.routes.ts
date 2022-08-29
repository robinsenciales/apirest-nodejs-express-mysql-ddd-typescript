import { AuthMiddleware } from '../_common/middleware/auth.middleware';
import { Router } from 'express';
import makeExpressCallback from '../_common/express-callback/index'
import { LanguageController } from './language.controller'


const
    languageRoutes = Router(),
    languageController = LanguageController(),
    middleware = AuthMiddleware()
    ;

languageRoutes.get(
    '/',
    middleware.checkAuth,
    middleware.checkRoleAuth(['admin']),
    makeExpressCallback(languageController.getLanguages)
);

languageRoutes.get(
    '/:id',
    middleware.checkAuth,
    middleware.checkRoleAuth(['admin']),
    makeExpressCallback(languageController.getLanguage)
);

languageRoutes.post(
    '/',
    middleware.checkAuth,
    middleware.checkRoleAuth(['admin']),
    makeExpressCallback(languageController.addLanguage)
);

languageRoutes.put(
    '/:id',
    middleware.checkAuth,
    middleware.checkRoleAuth(['admin']),
    makeExpressCallback(languageController.updateLanguage)
);

languageRoutes.delete(
    '/:id',
    middleware.checkAuth,
    middleware.checkRoleAuth(['admin']),
    makeExpressCallback(languageController.deleteLanguage)
);

export default languageRoutes;
