import {beyond, Events} from '@beyond-js/kernel/core/ts';
import {instances as bundles, Package} from '@beyond-js/kernel/bundle/ts';

interface IWidgetStore {
    toJSON(): object | void;

    hydrate?(cached: object): Promise<void>;

    fetch(): Promise<void>;
}

export /*bundle*/
class Texts<TextsDeclaration> extends Events implements IWidgetStore {
    readonly #module: string;
    get module() {
        return this.#module;
    }

    readonly #bundle: string;
    get bundle() {
        return this.#bundle;
    }

    readonly #multilanguage: boolean;
    get multilanguage() {
        return this.#multilanguage;
    }

    readonly #language: string;
    get language() {
        return this.#language;
    }

    // The bundle package
    #pkg: Package;

    #loaded = false;
    get loaded() {
        return this.#loaded;
    }

    #loading: boolean;
    get loading() {
        return this.#loading;
    }

    #value: TextsDeclaration;
    get value() {
        return this.#value;
    }

    get ready() {
        if (this.#loading) return false;
        this.load().catch(exc => console.log(exc.stack));
        return !this.#loading && this.#loaded;
    }

    /**
     * Module texts constructor
     *
     * @param {Module} module The module that holds the texts bundle
     * @param {string} bundle The bundle name
     * @param {string=} language
     */
    constructor(module: string, bundle: string, language?: string) {
        super();
        this.#module = module;
        this.#bundle = bundle;
        this.#language = language;
    }

    // Updated the value of the texts from the exported texts of the bundle package
    // Used by HMR when packaged has been updated
    #update = () => {
        this.#value = this.#pkg.exports.values.texts;
        this.trigger('change');
    }

    async fetch() {
        if (this.#loading || this.#loaded) return;

        this.#loading = true;
        this.trigger('change');

        const id = `${this.#module}/${this.#bundle}`;

        const resource: { bundle: string, pathname: string } = (() => {
            const bundle = this.#bundle;
            const transversal = bundle !== 'txt';

            let pathname = transversal ? `${beyond.application.package.id}/${this.#bundle}` : id;
            pathname = pathname + (this.#language ? `.${this.#language}` : '');
            return {bundle, pathname};
        })();

        await beyond.import(resource.pathname);
        const bundle = bundles.get(id);
        const pkg: Package = this.#pkg = bundle.package(this.#language);

        pkg.hmr.on('change', this.#update);
        this.#value = pkg.exports.values.txt;

        this.#loading = false;
        this.#loaded = true;
        this.trigger('change');
    }

    /**
     * @deprecated Deprecated method. Use .fetch instead
     * @return {Promise<void>}
     */
    async load() {
        await this.fetch();
    }

    destroy() {
        this.#pkg?.hmr.off('change', this.#update);
    }

    toJSON() {
        return {};
    }
}
