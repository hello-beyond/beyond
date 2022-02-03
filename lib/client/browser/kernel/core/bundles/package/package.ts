import type {Bundle} from "../bundle";
import {Creators, InternalModules} from "./ims/ims";
import {Require} from "./require/require";
import {Exports} from "./exports/exports";
import {PackageHMR} from "./hmr";

export class Package {
    readonly #bundle: Bundle;
    get bundle() {
        return this.#bundle;
    }

    readonly #language: string;
    get language() {
        return this.#language;
    }

    get multilanguage() {
        return this.#language !== '.';
    }

    readonly #require: Require;

    readonly #ims: InternalModules;
    get ims() {
        return this.#ims;
    }

    readonly #hmr: PackageHMR;
    get hmr() {
        return this.#hmr;
    }

    readonly #exports: Exports;
    get exports() {
        return this.#exports;
    }

    constructor(bundle: Bundle, language: string) {
        this.#bundle = bundle;
        this.#language = language ? language : '.';

        this.#ims = new InternalModules(this);
        this.#require = new Require(this);
        this.#ims._require = this.#require;
        this.#exports = new Exports(this.#require);
        this.#hmr = new PackageHMR(this);
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    initialise(ims?: Creators) {
        if (this.#initialised) throw new Error('Package already initialised');
        this.#initialised = true;
        ims && this.#ims.register(ims);
        this.exports.update();
        this.#ims.initialise();
    }

    update(ims: Creators) {
        this.#ims.update(ims);
        this.exports.update();
        this.#ims.initialise();
    }
}
