import { Params } from '../_types/common.interface';
import { util } from "../../kernel/util";

class LanguageFactory {
    createFrom({ name, programmers }: Params = {}) {
        if (!name) {
            throw new Error('Language must have an name.')
        }
        if (!programmers) {
            throw new Error('Language must have an programmers.')
        }

        let sanitizedName = util.sanitize(name).trim();
        if (sanitizedName.length < 1) {
            throw new Error('Language contains no usable name.')
        }

        return Object.freeze({
            getName: () => sanitizedName,
            getProgrammers: () => programmers
        });
    }
}

export { LanguageFactory }
