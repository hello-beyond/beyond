import {PackageData} from "../package/data";
import {Service, IServiceConfig} from "../service/service";
import {Modules} from "../modules/modules";
import {Bundles} from "../bundles/bundles";
import {Beyond} from "../beyond";

export interface ILibraryConfig extends IServiceConfig {
    package: string,
    version?: string
}

export class Library extends Service {
    get is() {
        return 'library';
    }

    readonly #package: PackageData;
    get package() {
        return this.#package;
    }

    get id(): string {
        return this.#package.id;
    }

    get pathname(): string {
        return `packages/${this.id}`;
    }

    readonly #version: string;
    get version() {
        return this.#version;
    }

    readonly #modules = new Modules(this);
    get modules() {
        return this.#modules;
    }

    readonly #bundles = new Bundles(this);
    get bundles() {
        return this.#bundles;
    }

    constructor(beyond: Beyond, config: ILibraryConfig) {
        super();
        if (!config.package) throw new Error('Package specification not set');

        this.#version = config.version;
        this.#package = new PackageData(config.package);
        super.setup(config);
    }
}
