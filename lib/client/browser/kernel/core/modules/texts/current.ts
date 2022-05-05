import {Module} from "../module";
import {ModuleTexts} from "./texts";
import {Beyond} from "../../beyond";
import {Events} from "../../utils/events/events";

/**
 * The texts loaded by the current language (not available in SSR environment)
 */
export /*bundle*/
class ModuleCurrentTexts<TextsDeclaration> extends Events {
    readonly #beyond: Beyond;
    #texts: Map<string, ModuleTexts<TextsDeclaration>> = new Map();

    readonly #module: Module;
    get module() {
        return this.#module;
    }

    get bundle() {
        return 'txt';
    }

    readonly #multilanguage: boolean;
    get multilanguage() {
        return this.#multilanguage;
    }

    #enabled = false;
    get enabled() {
        return this.#enabled;
    }

    set enabled(value) {
        this.#enabled = !!value;
        value && this.load().catch(exc => console.error(exc.stack));
    }

    #last: ModuleTexts<TextsDeclaration>;

    get #current(): ModuleTexts<TextsDeclaration> {
        const {current: language} = this.#beyond.languages;
        if (this.#texts.has(language)) return this.#texts.get(language);

        const texts: ModuleTexts<TextsDeclaration> =
            new ModuleTexts(this.#module, 'txt', this.#multilanguage, language);

        this.#texts.set(language, texts);
        return texts;
    }

    get loading(): boolean {
        return this.#current.loading;
    }

    get loaded(): boolean {
        return this.#current.loaded;
    }

    /*
    @deprecated
    old versions
     */
    get ready() {
        !this.loaded && !this.loading && this.load().catch((exc: Error) => console.error(exc.stack));
        return this.loaded;
    }

    get value(): TextsDeclaration {
        return this.#current.value;
    }

    /**
     * Module texts constructor
     *
     * @param {Module} module The module that holds the texts bundle
     * @param {boolean} multilanguage
     */
    constructor(module: Module, multilanguage?: boolean) {
        super();
        this.#module = module;
        this.#multilanguage = multilanguage;

        this.#beyond = require('../../beyond').beyond;
        this.#beyond.languages.on('change', this.#change);

        this.#current.on('change', this.#triggerChange);
        this.#last = this.#current;
    }

    #triggerChange = () => {
        this.trigger('change');
    }

    #change = () => {
        this.#last.off('change', this.#triggerChange);

        this.#enabled && this.load().catch(exc => console.log(exc.stack));
        this.#current.on('change', this.#triggerChange);
        this.#last = this.#current;

        this.#triggerChange();
    }

    async load() {
        await this.#current.load();
    }

    destroy() {
        this.#texts.forEach(texts => texts.destroy());
        this.#beyond.languages.off('change', this.#change);
    }
}
