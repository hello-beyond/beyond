import type {Beyond} from "../beyond";
import type {Require} from "../import/requirejs";
import {ILanguagesConfig, Languages} from "./languages";
import {PackageData} from "../package/data";

declare const amd_require: Require;

export interface IApplicationConfig {
    package: string,
    version: string,
    layout: string,
    params: object,
    languages: ILanguagesConfig
}

export class Application {
    get is() {
        return 'application';
    }

    readonly #beyond: Beyond;

    constructor(beyond: Beyond) {
        this.#beyond = beyond;
    }

    #package: PackageData;
    get package() {
        return this.#package;
    }

    get id(): string {
        return this.#package.id;
    }

    #version: string;
    get version() {
        return this.#version;
    }

    #layout: string;
    get layout() {
        return this.#layout;
    }

    #params: object;
    get params() {
        return this.#params;
    }

    #languages: Languages;
    get languages() {
        return this.#languages;
    }

    setup(config: IApplicationConfig) {
        // The configuration of the application package is not required when
        // it is a web page that is not being created with BeyondJS,
        // but where it is going to import packages created with BeyondJS as standalone modules and/or libraries
        this.#package = config.package && new PackageData(config.package);
        this.#version = config.version ? config.version : '';
        this.#layout = config.layout;
        this.#params = config.params;
        this.#languages = new Languages(config.languages);

        if (typeof amd_require !== 'undefined') {
            const paths: Record<string, string> = {};
            paths[config.package] = this.#beyond.baseUrl;
            amd_require.config({paths});
        }
    }
}
