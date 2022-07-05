import {beyond, Events} from '@beyond-js/kernel/core';
import {Texts} from './texts';

interface IWidgetStore {
    toJSON(): object | void;

    hydrate?(cached: object): Promise<void>;

    fetch(): Promise<void>;
}

/**
 * The texts loaded by the current language (not available in SSR environment)
 */
export /*bundle*/
class CurrentTexts<TextsDeclaration> extends Events implements IWidgetStore {
    #texts: Map<string, Texts<TextsDeclaration>> = new Map();

    readonly #bundle;
    get bundle() {
        return this.#bundle;
    }

    #enabled = false;
    get enabled() {
        return this.#enabled;
    }

    set enabled(value) {
        this.#enabled = !!value;
        value && this.fetch().catch(exc => console.error(exc.stack));
    }

    #last: Texts<TextsDeclaration>;

    get #current(): Texts<TextsDeclaration> {
        const {current: language} = beyond.languages;
        if (this.#texts.has(language)) return this.#texts.get(language);

        const texts: Texts<TextsDeclaration> = new Texts(this.#bundle, {language});
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
     * Current texts constructor
     *
     * @param {string} bundle
     */
    constructor(bundle: string) {
        super();
        this.#bundle = bundle;

        beyond.languages.on('change', this.#change);
        this.#current.on('change', this.#triggerChange);
        this.#last = this.#current;
    }

    #triggerChange = () => {
        this.trigger('change');
    }

    #change = () => {
        this.#last.off('change', this.#triggerChange);

        this.#enabled && this.fetch().catch(exc => console.log(exc.stack));
        this.#current.on('change', this.#triggerChange);
        this.#last = this.#current;

        this.#triggerChange();
    }

    async fetch() {
        await this.#current.fetch();
    }

    /**
     * @deprecated Deprecated method. Use .fetch instead
     * @return {Promise<void>}
     */
    async load() {
        await this.#current.fetch();
    }

    destroy() {
        this.#texts.forEach(texts => texts.destroy());
        beyond.languages.off('change', this.#change);
    }

    toJSON() {
        return {};
    }
}
