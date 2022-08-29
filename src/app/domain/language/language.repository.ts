import { Params } from "../types/common.interface";

interface LanguageRepository {

    findAll({ }: Params): Promise<any>;

    findById({ id }: Params): Promise<any>;

    findByName({ name }: Params): Promise<any>;

    insert(languageInfo: Params): Promise<any>;

    update(languageInfo: Params): Promise<any>;

    remove(languageInfo: Params): Promise<any>;

}

export { LanguageRepository }