import Action from "./";
import {Module} from '@beyond-js/kernel/bundle/ts';

export /*bundle*/
class ActionsBridge {
    readonly #distribution: string;
    readonly #module: string;
    readonly #backend: string;

    constructor(distribution: string, module: Module) {
        this.#distribution = distribution;
        this.#module = `${module.pkg}/${module.name}`;
        this.#backend = `${module.pkg}/${this.#distribution}`;
    }

    async execute(action: string, ...params: any[]): Promise<any> {
        const a = new Action(this.#backend, this.#module, action, ...params);
        return await a.execute();
    }
}
