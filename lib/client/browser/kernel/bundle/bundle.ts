import {Package} from "./package";
import {instances} from "./instances";
import {Module} from "./module";

export /*bundle*/
class Bundle extends Map<string, Package> {
    readonly #id: string;
    get id() {
        return this.#id;
    }

    readonly #module: Module;
    get module() {
        return this.#module;
    }

    constructor(id: string) {
        super();
        this.#id = id;
        this.#module = new Module(id);
        instances.register(this);
    }

    package(language?: string): Package {
        if (language && language.length !== 2) throw new Error(`Language "${language}" is invalid`);
        language = !language ? '' : language;

        if (this.has(language)) return this.get(language);

        const pkg = new Package(this, language);
        this.set(language, pkg);
        return pkg;
    }
}
