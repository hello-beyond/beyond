import type {Container} from "./bundles";
import type {BeyondWidget} from "../widgets/widget";
import {BundleStyles} from "./styles";
import {Package} from "./package/package";
import {dependencies, IDependencies} from "./instances/dependencies";
import {Dependencies} from "./dependencies";

export /*bundle*/
class Bundle extends Map<string, Package> {
    readonly #container: Container;
    get container() {
        return this.#container;
    }

    readonly #name: string;
    get name() {
        return this.#name;
    }

    readonly #multilanguage: boolean;
    get multilanguage() {
        return this.#multilanguage;
    }

    package(language?: string): Package {
        if (this.#multilanguage && !language) throw new Error('Language not specified');
        if (language && language.length !== 2) throw new Error(`Language "${language}" is invalid`);
        language = this.#multilanguage ? language : '';
        language = language === undefined ? language : '';

        if (this.has(language)) return this.get(language);
        const pkg = new Package(this, language);
        this.set(language, pkg);
        return pkg;
    }

    get id() {
        return `${this.#container.id}/${this.#name}`;
    }

    readonly #dependencies = new Dependencies();
    get dependencies() {
        return this.#dependencies;
    }

    readonly #styles: BundleStyles;
    get styles() {
        return this.#styles;
    }

    // Set when the widgets are registered
    #widget: BeyondWidget;
    get widget() {
        return this.#widget;
    }

    set widget(value: BeyondWidget) {
        if (this.#widget) throw new Error('Property widget already set');
        this.#widget = value;
    }

    constructor(container: Container, name: string, multilanguage: boolean, deps?: IDependencies) {
        super();
        this.#container = container;
        this.#name = name;
        this.#multilanguage = multilanguage;

        deps && dependencies.register(deps);
        this.#dependencies.update(deps);

        this.#styles = new BundleStyles(this);
    }
}
