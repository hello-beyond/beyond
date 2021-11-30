import type {Module} from "./item";
import type {Bundle} from "../bundles/item";
import type {ProcessorSource} from "../processors/sources/item";

export /*bundle*/
class ModuleTexts {

    readonly #parent;

    get has() {
        return !!this.#parent.getBundle('txt');
    }

    get value() {
        return this.#parent.getBundle('txt');
    }

    constructor(parent: Module) {
        this.#parent = parent;
    }

    get(property: string, language: string | undefined = 'spa'): string | undefined {
        let texts;
        let bundle: undefined | Bundle;
        this.#parent.bundles.forEach(b => b.name === 'txt' ? bundle = b : null);

        if (!bundle) return;

        const processor = bundle.processors.get('txt');
        processor.sources.items.forEach((source: ProcessorSource) => {
            texts = source && JSON.parse(source.code);
        });

        return texts && texts[language][property];
    }
}