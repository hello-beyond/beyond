import type {Packages} from "../packages/packages";
import {BeyondRequire} from "./require";

declare function es6_import(module: string): Promise<any>;

declare function bimport(module: string): Promise<any>;

export class BeyondImport {
    #require: BeyondRequire;

    readonly #packages: Packages;
    readonly #mode: string;
    readonly #baseUrl: string;

    constructor(packages: Packages, mode: string, baseUrl: string) {
        this.#packages = packages;
        this.#mode = mode;
        this.#baseUrl = baseUrl;

        if (['amd', 'cjs'].includes(mode)) {
            this.#require = new BeyondRequire(mode);
            mode === 'amd' && this.#require.setup(baseUrl);
        }
    }

    /**
     * Import a module with baseURL resolution
     *
     * @param module {string} The module to be imported
     * @param version {number} The version required by hmr to update a bundle's processor
     * @returns {Promise<*>}
     */
    async import(module: string, version?: number) {
        if (module.startsWith('/') || module.startsWith('.')) {
            console.warn(`Module "${module}" must only specify non-relative paths`);
            module = module.substr(1);
        }

        if (this.#mode === 'cjs') return await bimport(module);
        if (this.#mode === 'amd') return await this.#require.require(module);

        let url: string;
        if (/^https?:\/\/.*$/.test(module)) {
            url = module;
        } else {
            const pkg = [...this.#packages].find(pkg => pkg === module || module.startsWith(`${pkg}/`));
            module = pkg ? 'packages/' + module : module;
            url = `${this.#baseUrl}${module}` + (version ? `?version=${version}` : '');
        }

        return await es6_import(url);
    }

    /**
     * Used only in local environment to support HMR
     *
     * @param {string} module The module to be loaded
     * @param {number} version
     * @return {Promise<*>}
     */
    async reload(module: string, version: number) {
        if (this.#mode === 'cjs') return await bimport(module);
        if (this.#mode === 'es6') return await this.import(module, version);
        return await this.#require.reload(module);
    }

    require(module: string) {
        return this.#require.require(module);
    }
}
