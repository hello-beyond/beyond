import type {Module} from "../modules/module";

export /*bundle*/
class ActionsBridge {
    #module;

    constructor(module: Module) {
        this.#module = module;
    }

    execute(action: string, ...params: any[]): any {
        return this.#module.execute(action, params);
    }
}
