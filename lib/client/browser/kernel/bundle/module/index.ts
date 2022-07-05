declare const beyond: any;

export /*bundle*/
class Module {
    readonly #pkg: string;
    get pkg() {
        return this.#pkg;
    }

    readonly #name: string;
    get name() {
        return this.#name;
    }

    get resource() {
        return `${this.pkg}/${this.name}`;
    }

    constructor(module: string) {
        const split = module.split('/');
        this.#pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();
        this.#name = split.join('/');
    }

    /**
     * @deprecated
     *
     * @param {string} action
     * @param {Record<string, *>} params
     * @return {Promise<*>}
     */
    async execute(action: string, params: Record<string, any>) {
        if (typeof (<any>globalThis).beyond !== 'object') return;

        const {backends} = await beyond.import('@beyond-js/backend/client');
        return await backends.execute(this.#pkg, 'legacy', this.#name, action, params);
    }
}
