import type {Beyond} from "../beyond";
import {ILanguagesConfig, Languages} from "./languages";
import {Modules} from "../modules/modules";
import {PackageData} from "../package/data";
import {IServiceConfig, Service} from "../service/service";

export interface IApplicationConfig extends IServiceConfig {
    package: string,
    version: string,
    layout: string,
    params: object,
    languages: ILanguagesConfig
}

export class Application extends Service {
    get is() {
        return 'application';
    }

    readonly #beyond: Beyond;

    constructor(beyond: Beyond) {
        super();
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

    readonly #modules = new Modules(this);
    get modules() {
        return this.#modules;
    }

    // External modules are standalone packages that do not have a container
    readonly #externals = new Modules();
    get externals() {
        return this.#externals;
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

        config.package && this.#beyond.packages.register(config.package, '.');
        super.setup(config);
    }
}
