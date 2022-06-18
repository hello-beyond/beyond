import {Backend, IBackendConfig} from './backend';
import type Action from './action';

export /*bundle*/ const backends = new class {
    readonly #backends: Map<string, Backend> = new Map();

    constructor() {
        const config: any = (globalThis as any).__beyond_config;
        const backends: [string, string][] = config?.backends;
        backends?.forEach(([id, host]) => {
            this.register({id, host});
        });
    }

    register(config: IBackendConfig) {
        if (this.#backends.has(config.id)) return;
        this.#backends.set(config.id, new Backend(config));
    }

    has(pkg: string) {
        return this.#backends.has(pkg);
    }

    get(pkg: string) {
        return this.#backends.get(pkg);
    }

    /**
     * @deprecated Actually used by the legacy module.execute(...)
     *
     * @param {string} pkg
     * @param {string} distribution
     * @param {string} module
     * @param {string} action
     * @param params
     * @return {Promise<*>}
     */
    async execute(pkg: string, distribution: string, module: string, action: string, ...params: any[]): Promise<any> {
        const a: Action = new (require('./action').default)(`${pkg}/${distribution}`, module, action, ...params);
        return await a.execute();
    }
}
