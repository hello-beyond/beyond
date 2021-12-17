import {beyond} from '@beyond-js/kernel/core/ts';

declare class LocalBridges {
    get: (module: string) => Promise<any>
}

declare const __bridges: LocalBridges;

type MethodsSpecs = Map<string, {}>;
export type BridgeSpecs = Map<string, MethodsSpecs>;
type BridgesSpecs = Map<string, BridgeSpecs>;

class Bridges {
    #bridges: BridgesSpecs;

    constructor() {
        if (typeof __bridges === 'object') return;

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
        const response = await __bridges.get(module);
        if (!response) return;

        const {error} = response;
        if (error) return {error: error};

        const classes: BridgeSpecs = new Map(response.classes);
        classes.forEach((methods, key) => classes.set(key, new Map(methods)));
        return {classes};
    }
}

export const bridges = new Bridges();
