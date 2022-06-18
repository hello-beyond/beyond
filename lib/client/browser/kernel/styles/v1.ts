import {beyond, Events} from '@beyond-js/kernel/core/ts';

export /*bundle*/
class V1Styles extends Events {
    get engine() {
        return 'v1';
    }

    /**
     * The bundle id
     * @type {string}
     * @private
     */
    readonly #bundle: string;
    get bundle() {
        return this.#bundle;
    }

    /**
     * The autoincremental HMR version
     * @type {number}
     * @private
     */
    #version = 0;
    get version() {
        return this.#version;
    }

    /**
     * The href without the version qs parameter
     * @type {string}
     * @private
     */
    readonly #resource: string;
    get resource() {
        return this.#resource;
    }

    /**
     * The url of the stylesheet including the HMR version qs parameter
     *
     * @return {string}
     */
    get href(): string {
        const version = this.#version ? `?version=${this.#version}` : '';
        return `${this.#resource}${version}`;
    }

    constructor(bundle: string) {
        super();
        this.#bundle = bundle;

        const appPackage = `${beyond.application.package.id}/`;

        const id = bundle.startsWith(appPackage) ? bundle.slice(appPackage.length) : `packages/${bundle}`;
        const baseUrl = typeof window === 'object' ? beyond.baseUrl : '##_!baseUrl!_##';
        this.#resource = `${baseUrl}/${id}.css`;
    }

    /**
     * Called by HMR in development environment
     */
    change() {
        this.#version++;
        this.trigger('change');
    }
}
