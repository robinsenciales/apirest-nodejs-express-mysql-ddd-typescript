import { LanguageRepository } from './language.repository';
import { Params } from '../_types/common.interface';
import { LanguageFactory } from "./language.factory";

import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from '../_types';

@injectable()
class LanguageService {
    private languageFactory: LanguageFactory;
    private languageRepository: LanguageRepository;

    constructor(
        @inject(TYPES.LanguageRepository) languageRepository: LanguageRepository
    ) {
        this.languageFactory = new LanguageFactory();
        this.languageRepository = languageRepository;
    }

    async list({ }: Params = {}) {
        const languages = await this.languageRepository.findAll({})
        return languages;
    }

    async get({ id }: Params = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }

        const language = await this.languageRepository.findById({ id })
        if (!language) {
            throw new RangeError('Language not found.')
        }

        return language;
    }

    async add(languageInfo: Params) {
        const languageForm = this.languageFactory.createFrom(languageInfo)
        const exists = await this.languageRepository.findByName({ name: languageForm.getName() })
        if (exists) {
            return exists
        }

        return this.languageRepository.insert({
            name: languageForm.getName(),
            programmers: languageForm.getProgrammers(),
        })
    }

    async update({ id, ...changes }: Params = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        if (!changes.name) {
            throw new Error('You must supply name.')
        }
        const existing = await this.languageRepository.findById({ id })

        if (!existing) {
            throw new RangeError('Language not found.')
        }
        const languageForm = this.languageFactory.createFrom({ ...existing, ...changes })
        if (languageForm.getName() === existing.name && languageForm.getProgrammers() === existing.programmers) {
            return existing
        }
        const updated = await this.languageRepository.update({
            id,
            name: languageForm.getName(),
            programmers: languageForm.getProgrammers(),
        })
        return { ...existing, ...updated }
    }

    async remove({ id }: Params = {}) {
        if (!id) {
            throw new Error('You must supply a language id.')
        }

        const languageToDelete = await this.languageRepository.findById({ id })

        if (!languageToDelete) {
            return this.deleteNothing()
        }

        return this.hardDelete(languageToDelete)
    }

    private deleteNothing() {
        return {
            deletedCount: 0,
            softDelete: false,
            message: 'Language not found, nothing to delete.'
        }
    }

    private async hardDelete(language: Params) {
        await this.languageRepository.remove(language)
        return {
            deletedCount: 1,
            softDelete: false,
            message: 'Language deleted.'
        }
    }
}

export { LanguageService }
