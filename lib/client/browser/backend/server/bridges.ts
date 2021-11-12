declare class LocalBridges {
    get: (module: string) => Promise<any>
}

declare const __bridges: LocalBridges;

type MethodsSpecs = Map<string, {}>;
export type BridgeSpecs = Map<string, MethodsSpecs>;

class Bridges {
    async get(module: string): Promise<BridgeSpecs> {
        const response = await __bridges.get(module);
        if (!response) return;

        const classes: BridgeSpecs = new Map(response);
        classes.forEach((methods, key) => classes.set(key, new Map(methods)));
        return classes;
    }
}

export const bridges = new Bridges();
