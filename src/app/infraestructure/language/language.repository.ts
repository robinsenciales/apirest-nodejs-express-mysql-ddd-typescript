import { LanguageRepository } from '../../domain/language/language.repository';
import getEntityManager from '../../kernel/db'
import { Params } from '../../domain/types/common.interface';

import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
class LanguageRepositoryImpl implements LanguageRepository {

    async findAll({ }: Params = {}) {
        const em = await getEntityManager();
        const result = await em.query('SELECT id, name, programmers FROM language')
        console.log(result);
        return result;
    }

    async findById({ id }: Params) {
        const em = await getEntityManager()
        const result = await em.query('SELECT id, name, programmers FROM language WHERE id = ?', id);
        console.log(result);
        if (result.length === 0) {
            return null
        }
        const { ...info } = result[0]
        return { ...info }
    }

    async insert({ ...languageInfo }) {
        const em = await getEntityManager()
        const result = await em
            .query('INSERT INTO language SET ?', languageInfo);
        console.log(result);
        const { ...insertedInfo } = languageInfo
        return { id: result.insertId, ...insertedInfo }
    }

    async update({ id, ...languageInfo }: Params) {
        const em = await getEntityManager()
        const result = await em
            .query('UPDATE language SET ? WHERE id = ?', [languageInfo, id])
        console.log(result);
        return result.affectedRows > 0 ? { id, ...languageInfo } : null
    }

    async remove({ id }: Params) {
        const em = await getEntityManager()
        const result = await em.query('DELETE FROM language WHERE id = ?', id)
        console.log(result);
        return result.deletedCount
    }

    async findByName({ name }: Params) {
        const em = await getEntityManager()
        const result = await em.query('SELECT id, name, programmers FROM language WHERE name = ?', name)
        console.log(result);
        if (result.length === 0) {
            return null
        }
        const { id, ...languageInfo } = result[0]
        return { id, ...languageInfo }
    }

}

export { LanguageRepositoryImpl }
