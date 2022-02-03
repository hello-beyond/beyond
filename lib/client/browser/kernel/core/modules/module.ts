import {Action} from "../service/action";
import {ModuleTexts} from "./texts";
import {Bundles} from "../bundles/bundles";
import {Application} from "../application/application";
import {PackageData} from "../package/data";
import type {Library} from "../libraries/library";
import type {Socket} from "socket.io";
import type {Beyond} from "../beyond";

export type Container = Application | Library;

export interface IModuleSpecs {
    dirname?: string

    // To know if the module has a txt bundle
    txt?: {
        multilanguage: boolean
    }
}

export /*bundle*/
class Module {
    get is() {
        return 'module';
    }

    readonly #container: Container;
    get container() {
        return this.#container;
    }

    // Only when the module is an external module (it is contained in its own package)
    readonly #package: PackageData;
    get package() {
        return this.#package;
    }

    readonly #id: string;
    get id(): string {
        return this.#id;
    }

    readonly #dirname: string;
    get dirname(): string {
        // dirname is a property that is only available in node environments (node, backend)
        if (typeof window === 'object') return;

        const {beyond} = this;
        if (beyond.local) return this.#dirname;

        // In production, resolve the dirname of the module
        const pkg = this.package ? this.package.id : this.container.id;

        // The path relative to the application
        const relative = this.id.slice(pkg.length + 1);

        if (pkg === beyond.application.id) {
            // __dirname is the path where the bundle @beyond-js/kernel/core is located (node_modules/@beyond-js/kernel/core)
            require('path').resolve(__dirname, '../../../..', relative);
        } else {
            const resolved = require.resolve(pkg);
            return require('path').join(resolved, relative);
        }
    }

    #beyond: Beyond;
    get beyond(): Beyond {
        if (this.#beyond) return this.#beyond;
        return this.#beyond = require('../beyond').beyond;
    }

    get pathname(): string {
        const {beyond} = this;
        const pkg = this.package ? this.package.id : this.container.id;
        const path = this.id.slice(pkg.length + 1);
        return pkg === beyond.application.id ? path : `${(<Library>this.container).pathname}/${path}`;
    }

    readonly #bundles = new Bundles(this);
    get bundles() {
        return this.#bundles;
    }

    get socket(): Promise<Socket> {
        return this.container.socket;
    }

    readonly #texts: ModuleTexts<any>;
    get texts() {
        return this.#texts;
    }

    async execute(path: string, params?: object) {
        if (!this.#container?.connect) throw new Error('Module does not support backend communication');
        const action = new Action(this, path, params);
        return action.execute();
    }

    /**
     * Module constructor
     *
     * @param {string} id The module id
     * @param {IModuleSpecs} specs
     * @param {Container} container Can be a library, an application or undefined (external modules)
     */
    constructor(id: string, specs: IModuleSpecs, container?: Container) {
        specs = specs ? specs : {};

        this.#id = id;
        this.#dirname = specs.dirname;
        this.#package = !container ? new PackageData(id) : undefined;
        this.#container = container;

        const {txt} = specs; // To know if the bundle's container has a txt bundle
        txt && (this.#texts = new ModuleTexts(this, 'txt', txt.multilanguage));
    }
}
