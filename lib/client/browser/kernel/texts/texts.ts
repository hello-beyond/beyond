import {beyond, Events} from '@beyond-js/kernel/core';
import {instances as bundles, Package} from '@beyond-js/kernel/bundle';

interface IWidgetStore {
    toJSON(): object | void;

    hydrate?(cached: object): Promise<void>;

    fetch(): Promise<void>;
}

export /*bundle*/
class Texts<TextsDeclaration> extends Events implements IWidgetStore {
    /**
     * The module resource
     * @type {string}
     * @private
     */
    readonly #module: string;
    get module() {
        return this.#module;
    }

    /**
     * The bundle name. Ex: 'txt'
     * @type {string}
     * @private
     */
    readonly #bundle: string;
    get bundle() {
        return this.#bundle;
    }

    /**
     * The transversal bundle name. Ex: 'txt-menu'
     * @type {string}
     * @private
     */
    readonly #transversal: string;
    get transversal() {
        return this.#transversal;
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
        this.fetch().catch(exc => console.log(exc.stack));
        return !this.#loading && this.#loaded;
    }

    /**
     * Module texts constructor
     *
     * @param {string} module The module resource
     * @param {{transversal: string, language: string}} specs
     */
    constructor(module: string, specs: { transversal?: string, language?: string, bundle?: string }) {
        if (!module) throw new Error('Invalid parameters');

        super();
        this.#module = module;
        specs = specs ? specs : {};

        this.#language = specs.language;
        this.#multilanguage = !!specs.language;
        this.#bundle = !specs.transversal ? (specs.bundle ? specs.bundle : 'txt') : void 0;
        this.#transversal = specs.transversal;
    }

    // Updated the value of the texts from the exported texts of the bundle package
    // Used by HMR when packaged has been updated
    #update = () => {
        this.#value = this.#pkg.exports.values.txt;
        this.trigger('change');
    }

    async fetch() {
        if (this.#loading || this.#loaded) return;

        this.#loading = true;
        this.trigger('change');

        // The bundle id and bundle name
        const bid = this.#module + '.' + (this.#transversal ? this.#transversal : this.#bundle);
        let resource = this.#transversal ? `${beyond.application.package.id}/${this.#transversal}` : bid;
        resource = resource + (this.#language ? `.${this.#language}` : '');

        await beyond.import(resource);
        const bundle = bundles.get(bid);
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
