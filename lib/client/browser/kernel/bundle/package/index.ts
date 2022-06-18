import type {Bundle} from "../bundle";
import {IMCreators, InternalModules} from "../ims";
import {Require} from "../require/require";
import Exports from "../exports";
import Dependencies from "./dependencies";
import instances from './instances';
import {Events} from '../events';

export /*bundle*/
class Package {
    readonly #bundle: Bundle;
    get bundle() {
        return this.#bundle;
    }

    readonly #language: string;
    get language() {
        return this.#language;
    }

    get id(): string {
        return this.#language ? `${this.#bundle.id}.${this.#language}` : this.#bundle.id;
    }

    readonly #require: Require;

    readonly #ims: InternalModules;
    get ims() {
        return this.#ims;
    }

    readonly #exports: Exports;
    get exports() {
        return this.#exports;
    }

    // The beyond dependencies that are required by the bundle
    readonly #dependencies = new Dependencies();
    get dependencies() {
        return this.#dependencies;
    }

    readonly #hmr = new Events();
    get hmr() {
        return this.#hmr;
    }

    constructor(bundle: Bundle, language: string) {
        this.#bundle = bundle;
        this.#language = language ? language : '';

        this.#ims = new InternalModules(this);
        this.#require = new Require(this);
        this.#ims._require = this.#require;
        this.#exports = new Exports(this.#require);

        instances.register(this);
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    initialise(ims?: IMCreators) {
        if (this.#initialised) throw new Error('Package already initialised');
        this.#initialised = true;
        ims && this.#ims.register(ims);
        this.exports.update();
        this.#ims.initialise();
    }

    update(ims: IMCreators) {
        this.#ims.update(ims);
        this.exports.update();
        this.#ims.initialise();
        this.#hmr.trigger('change');
    }
}
