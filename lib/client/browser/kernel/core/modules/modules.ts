import {Module, Container, IProcessorsSpecs} from './module';

export class Modules extends Map<string, Module> {
    readonly #container: Container;
    get container() {
        return this.#container;
    }

    constructor(container?: Container) {
        super();
        this.#container = container;
    }

    obtain(id: string, specs: IProcessorsSpecs): Module {
        if (this.has(id)) return this.get(id);

        const module = new Module(id, specs, this.#container);
        this.set(id, module);
        return module;
    }
}
