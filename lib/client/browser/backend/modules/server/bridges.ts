import {beyond} from '@beyond-js/kernel/core';

interface ILocalBridges {
    get: (module: string) => Promise<any>
}

type MethodsSpecs = Map<string, {}>;
export type BridgeSpecs = Map<string, MethodsSpecs>;
type BridgesSpecs = Map<string, BridgeSpecs>;

class Bridges {
    // The bridges specification in production environment (not requested to the BEE)
    readonly #bridges: BridgesSpecs;

    constructor() {
        if (typeof (<any>globalThis).__bee === 'object') return;

        // In production environment get the actions from the actions.specs.json file
        const specs: any = beyond.require(`${beyond.application.package.id}/actions.specs.json`);
        if (!specs) return;
        this.#bridges = new Map(specs);
        this.#bridges.forEach((specs, module) => {
            this.#bridges.set(module, new Map(specs));
        });
    }

    async get(module: string): Promise<{ error?: string, classes?: BridgeSpecs }> {
        if (this.#bridges) {
            const classes: BridgeSpecs = this.#bridges.get(module);
            return Promise.resolve({classes});
        }

        // In development environment, request the bridges to the BEE
        const bridges: ILocalBridges = (<any>globalThis).__bee.bridges;
        const response = await bridges.get(module);
        if (!response) return;

        const {error} = response;
        if (error) return {error: error};

        const classes: BridgeSpecs = new Map(response.classes);
        classes.forEach((methods, key) => classes.set(key, new Map(methods)));
        return {classes};
    }
}

export const bridges = new Bridges();
