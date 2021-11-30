import {Application} from './application/application';
import {Libraries} from "./libraries/libraries";
import {BeyondImport} from "./import/import";
import {Collection} from "./utils/collection/collection";
import {widgets} from './widgets/widgets';
import {BundlesInstances, instances} from './bundles/instances/instances';
import {Dependencies, dependencies} from "./bundles/instances/dependencies";
import {transversals} from "./transversals/transversals";
import {Packages} from "./packages/packages";
import {MessageSpec, Toast} from "./toast/toast";
import {MessageType} from "./toast/messages";

// import "./_prepare-stack-trace/error";

export interface IBeyondConfig {
    local: boolean;
    environment: string;
    mode: string;
    baseUrl: string;
    packages: [string, { errors: string[], filename: string }][];
}

export class Beyond {
    #packages = new Packages();
    get packages() {
        return this.#packages;
    }

    #application = new Application(this);
    get application() {
        return this.#application;
    }

    #libraries = new Libraries(this);
    get libraries() {
        return this.#libraries;
    }

    get bundles(): BundlesInstances {
        return instances;
    }

    #transversals = transversals;
    get transversals() {
        return this.#transversals;
    }

    get dependencies(): Dependencies {
        return dependencies;
    }

    #local: boolean;
    get local() {
        return this.#local;
    }

    #environment: string;
    get environment() {
        return this.#environment;
    }

    get params() {
        return this.#application.params;
    }

    get languages() {
        return this.#application.languages;
    }

    #mode: string;
    get mode() {
        return this.#mode;
    }

    #baseUrl: string;
    get baseUrl() {
        return this.#baseUrl;
    }

    #import: BeyondImport;
    import = (module: string): Promise<any> => this.#import.import(module);

    // Required by HMR only in local environment
    reload = (module: string, version: number): Promise<any> => this.#import.reload(module, version);
    require = (module: string): Promise<any> => this.#import.require(module);

    get widgets(): typeof widgets {
        return widgets;
    }

    get Collection() {
        return Collection;
    }

    setup(config: IBeyondConfig) {
        this.#local = config.local;
        this.#environment = config.environment;

        this.#mode = config.mode ? config.mode : 'amd';
        this.#mode = ['es6', 'cjs'].includes(this.#mode) ? this.#mode : 'amd';
        this.#baseUrl = config.baseUrl ? config.baseUrl : '';

        // Register the externals and the modules that are packages
        const packages = new Map(config.packages);
        packages?.forEach(({errors, filename}, pkg) => {
            if (errors) {
                console.log(`Package "${pkg}" is invalid:`, errors);
                return;
            }
            this.#packages.register(pkg, `packages/${pkg}/${filename}`);
        });

        this.#import = new BeyondImport(this.#packages, config.mode, config.baseUrl);
    }

    // Required for backward compatibility
    rpc = {prepare: (): void => void 0};

    #toast = new Toast;

    showMessage = (specs: MessageSpec, duration?: number) => this.#toast.showMessage(specs, duration);

    showConnectionError = (callback: () => void) => this.#toast.showMessage({
        type: MessageType.ConnectionError,
        retry: callback
    });

    showWarning = (text: string, duration: number) => this.#toast.showMessage({
        type: MessageType.Warning,
        text: text,
        duration: duration
    });

    removeMessage = (id: string) => this.#toast.removeMessage(id);
}

export /*bundle*/ const beyond = new Beyond;
(<any>globalThis).beyond = beyond;
