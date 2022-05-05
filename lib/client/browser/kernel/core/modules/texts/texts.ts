import type {Beyond} from "../../beyond";
import type {Module} from "../module";
import type {Package} from "../../bundles/package/package";
import {Events} from "../../utils/events/events";

export /*bundle*/
class ModuleTexts<TextsDeclaration> extends Events {
    readonly #beyond: Beyond;

    readonly #module: Module;
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

    readonly #language: string;
    get language() {
        return this.#language;
    }

    /**
     * Module texts constructor
     *
     * @param {Module} module The module that holds the texts bundle
     * @param {string} bundle The bundle name
     * @param {boolean=} multilanguage
     * @param {string=} language
     */
    constructor(module: Module, bundle: string, multilanguage?: boolean, language?: string) {
        super();
        this.#module = module;
        this.#bundle = bundle;
        this.#multilanguage = bundle === 'txt' ? multilanguage : true;
        this.#language = language;
        this.#beyond = require('../../beyond').beyond;

        if (multilanguage && !language) throw new Error('Language must be set on a multilanguage texts bundle');
    }

    // Updated the value of the texts from the exported texts of the bundle package
    // Used by HMR when packaged has been updated
    #update = () => {
        const {bundle} = this.#pkg;
        this.#value = bundle.package(this.#language).exports.values.texts;
        this.trigger('change');
    }

    async load() {
        if (this.#loading || this.#loaded) return;

        this.#loading = true;
        this.trigger('change');

        const id = `${this.#module.id}/${this.#bundle}`;

        const resource: { bundle: string, pathname: string } = (() => {
            const bundle = this.#bundle;
            const transversal = bundle !== 'txt';

            let pathname = transversal ? `${this.#beyond.application.package.id}/${this.#bundle}` : id;
            pathname = pathname + (this.#multilanguage ? `.${this.#language}` : '');
            return {bundle, pathname};
        })();

        await this.#beyond.import(resource.pathname);
        const bundle = this.#beyond.bundles.get(id);
        const pkg = this.#pkg = bundle.package(this.#multilanguage ? this.#language : void 0);

        pkg.hmr.on('change:txt', this.#update);
        this.#value = pkg.exports.values.txt;

        this.#loading = false;
        this.#loaded = true;
        this.trigger('change');
    }

    destroy() {
        this.#pkg?.hmr.off('change:txt', this.#update);
    }
}
