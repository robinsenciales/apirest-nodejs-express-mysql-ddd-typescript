import httpStatus from 'http-status';
import { container } from '../inversify.config';
import { LanguageService } from '../../domain/language/language.service';
import { TYPES } from '../../domain/types';

function LanguageController() {
    return Object.freeze({
        getLanguages: async () => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const languagesService = container.get<LanguageService>(TYPES.LanguageService);
                const languages = await languagesService.list({})
                return {
                    headers,
                    statusCode: httpStatus.OK,
                    body: languages
                }
            } catch (e: any) {
                // TODO: Error logging
                console.log(e)
                return {
                    headers,
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        },

        getLanguage: async (req: any) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const languagesService = container.get<LanguageService>(TYPES.LanguageService);
                const { id } = req.params;
                const language = await languagesService.get({ id })
                return {
                    headers,
                    statusCode: httpStatus.OK,
                    body: language
                }
            } catch (e: any) {
                // TODO: Error logging
                console.log(e)
                if (e.name === 'RangeError') {
                    return {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        statusCode: httpStatus.NOT_FOUND,
                        body: {
                            error: e.message
                        }
                    }
                }
                return {
                    headers,
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        },

        addLanguage: async (req: any) => {
            try {
                const languagesService = container.get<LanguageService>(TYPES.LanguageService);
                const { ...languageInfo } = req.body
                const created = await languagesService.add({
                    ...languageInfo,
                })
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.CREATED,
                    body: { created }
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

        updateLanguage: async (req: any) => {
            try {
                const languagesService = container.get<LanguageService>(TYPES.LanguageService);
                const { ...languageInfo } = req.body
                const toEdit = {
                    ...languageInfo,
                    id: req.params.id
                }
                const edited = await languagesService.update(toEdit)
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.OK,
                    body: { edited }
                }
            } catch (e: any) {
                // TODO: Error logging
                console.log(e)
                if (e.name === 'RangeError') {
                    return {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        statusCode: httpStatus.NOT_FOUND,
                        body: {
                            error: e.message
                        }
                    }
                }
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

        deleteLanguage: async (req: any) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const languagesService = container.get<LanguageService>(TYPES.LanguageService);
                const deleted = await languagesService.remove({ id: req.params.id })
                return {
                    headers,
                    statusCode: deleted.deletedCount === 0 ? httpStatus.NOT_FOUND : httpStatus.OK,
                    body: { deleted }
                }
            } catch (e: any) {
                // TODO: Error logging
                console.log(e)
                return {
                    headers,
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        }
    })
}

export { LanguageController }