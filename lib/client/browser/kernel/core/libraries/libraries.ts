import {Library, ILibraryConfig} from './library';
import {Beyond} from "../beyond";

export class Libraries extends Map<string, Library> {
    readonly #beyond: Beyond;

    register(libraries: ILibraryConfig[]) {
        for (const config of libraries) {
            const library = new Library(this.#beyond, config);
            if (library.id !== '@beyond-js/kernel' && this.has(library.id)) {
                throw new Error(`Library "${library.package.id}" already registered`);
            }
            this.set(library.package.id, library);
        }
    }

    constructor(beyond: Beyond) {
        super();
        this.#beyond = beyond;
        this.register([{package: '@beyond-js/kernel'}]);
    }
}
