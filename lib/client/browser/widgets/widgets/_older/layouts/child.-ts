import type {Layout} from "./layout";
import type {LayoutConfig} from "../config/layouts/layout";
import type {PageInstanceData} from "../pages/data";

declare function require(module: string): any;

export class Child {
    readonly #config: LayoutConfig | PageInstanceData;

    get element() {
        return this.#config.element;
    }

    get is(): string {
        return this.#config.is;
    }

    get id(): string {
        return this.#config.id;
    }

    readonly #layout: Layout; // Only if the instance is a layout
    get layout() {
        return this.#layout;
    }

    get children() {
        return this.#layout?.children;
    }

    #active = false;
    get active() {
        return this.#active;
    }

    constructor(config: LayoutConfig | PageInstanceData) {
        this.#config = config;

        const {Layout} = require('./layout');
        config.is === 'layout' && (this.#layout = new Layout(this.#layout));
    }

    show() {
        this.#active = true;
    }

    hide() {
        this.#active = false;
    }
}
