import type {Beyond} from "../beyond";
import type {Module} from "./module";
import type {Package} from "../bundles/package/package";
import {Events} from "../utils/events/events";
import {SingleCall} from "../utils/execution-control/single-call/single-call";

export /*bundle*/
class ModuleTexts<TextsDeclaration> extends Events {
    readonly #beyond: Beyond;

    readonly #id: string;
    get id() {
        return this.#id;
    }

    readonly #multilanguage: boolean;
    get multilanguage() {
        return this.#multilanguage;
    }

    #value: TextsDeclaration;
    get value() {
        return this.#value;
    }

    #pkg: Package;

    #enabled = false;
    get enabled() {
        return this.#enabled;
    }

    set enabled(value) {
        this.#enabled = !!value;
        value && this.load().catch(exc => console.error(exc.stack));
    }

    #loaded = false;
    get loaded() {
        return this.#loaded;
    }

    // The language being load
    #loading: string;
    get loading() {
        return this.#loading;
    }

    get ready() {
        if (this.#loading) return false;
        this.load().catch(exc => console.log(exc.stack));
        return !this.#loading && this.#loaded;
    }

    #language: string;
    get language() {
        return this.#language;
    }

    // HMR updates
    #update = () => {
        const {bundle} = this.#pkg;
        this.#value = bundle.package(this.#language).exports.values.texts;
        this.trigger('change');
    }

    #import = async () => {
        const beyond = this.#beyond;

        const resource: { bundle: string, pathname: string } = (() => {
            const bundle = this.#id.split('/').pop();
            const transversal = bundle === 'txt-menu';
            const pathname = (transversal ? bundle : this.#id) + (this.#multilanguage ? `.${this.#loading}` : '');
            return {bundle, pathname};
        })();

        await beyond.import(resource.pathname);

        const bundle = beyond.bundles.get(this.#id);
        const pkg = this.#pkg = bundle.package(this.#multilanguage ? this.#loading : void 0);

        pkg.hmr.on('change:txt', this.#update);
        this.#value = pkg.exports.values.txt;
    }

    #change = () => {
        if (!this.#enabled) return;
        this.load().catch(exc => console.error(exc.stack));
    }

    /**
     * Module texts constructor
     *
     * @param {Module} module The module that holds the texts bundle
     * @param {string} bundle The bundle name
     * @param {boolean=true} multilanguage
     */
    constructor(module: Module, bundle: string, multilanguage = true) {
        super();
        this.#id = `${module.id}/${bundle}`;
        this.#multilanguage = multilanguage;

        this.#beyond = require('../beyond').beyond;
        this.#beyond.languages.on('change', this.#change);
    }

    @SingleCall
    async load() {
        this.#enabled = true;
        const {current} = this.#beyond.languages;

        if (this.#language === current) return;
        this.#loading = current;
        this.trigger('change');

        await this.#import();

        // Check if language changed while loading
        if (this.#loading !== this.#beyond.languages.current) {
            await this.load();
            return;
        }

        this.#loading = void 0;
        this.#loaded = true;
        this.#language = current;

        this.trigger('change');
    }

    destroy() {
        this.#pkg?.hmr.off('change:txt', this.#update);
        this.#beyond.languages.off('change', this.#change);
    }
}
