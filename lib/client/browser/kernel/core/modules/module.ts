import {Action} from "../service/action";
import {ModuleTexts} from "./texts";
import {Bundles} from "../bundles/bundles";
import {Application} from "../application/application";
import {Library} from "../libraries/library";
import {PackageData} from "../package/data";
import type {Socket} from "socket.io";

export type Container = Application | Library;

export interface IProcessorsSpecs {
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
     * @param {IProcessorsSpecs} processors Processors specification (actually only txt is supported)
     * @param {Container} container Can be a library, an application or undefined (external modules)
     */
    constructor(id: string, processors: IProcessorsSpecs, container?: Container) {
        processors = processors ? processors : {};

        this.#id = id;
        this.#package = !container ? new PackageData(id) : undefined;
        this.#container = container;

        const {txt} = processors;
        txt && (this.#texts = new ModuleTexts(this, 'txt', txt.multilanguage));
    }
}
