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

    readonly #name: string;
    get name() {
        return this.#name;
    }

    readonly #multibundle: boolean;
    get multibundle() {
        return this.#multibundle;
    }

    constructor(params: { module: string, multibundle?: boolean, bundle: string }) {
        super();
        const {module, multibundle, bundle} = params;
        if (!module || !bundle) throw new Error('Invalid bundle creation parameters');

        this.#id = multibundle ? `${module}.${bundle}` : module;
        this.#name = bundle;
        this.#multibundle = multibundle;
        this.#module = new Module(module);
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
