import {Application, IApplicationConfig} from './application/application';
import {Libraries} from "./libraries/libraries";
import {BeyondImport} from "./import/import";
import {Collection} from "./utils/collection/collection";
import {widgets} from './widgets/widgets';
import {BundlesInstances, instances} from './bundles/instances/instances';
import {Dependencies, dependencies} from "./bundles/instances/dependencies";
import {transversals} from "./transversals/transversals";
import {MessageSpec, Toast} from "./toast/toast";
import {MessageType} from "./toast/messages";
import type {ILibraryConfig} from "./libraries/library";

// import "./_prepare-stack-trace/error";

export interface IBeyondDistribution {
    key?: string; // Only required in local environment to support HMR
    local?: boolean;
    baseDir: string;
    environment: string;
    mode?: string;
}

export interface IBeyondConfig {
    distribution: IBeyondDistribution;
    application?: IApplicationConfig,
    libraries?: ILibraryConfig[]
}

declare const __beyond_config: IBeyondConfig;

export class Beyond {
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

    #distribution: string;
    get distribution() {
        return this.#distribution;
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

    #baseDir: string;
    get baseDir() {
        return this.#baseDir;
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

    setup(distribution: IBeyondDistribution) {
        let {key, local, baseDir, environment, mode} = distribution;

        // The distribution key is only required in local environment to support HMR
        this.#distribution = local ? key : void 0;
        this.#environment = environment ? environment : 'production';

        this.#local = local ? local : false;

        this.#mode = typeof window === 'object' ? 'amd' : 'cjs';
        if (mode && this.#mode !== mode) {
            throw new Error(`Expected module packaging type to be "${this.#mode}" instead of "${mode}"`);
        }

        this.#baseDir = baseDir = (() => {
            if (typeof window === 'undefined') return;

            baseDir = baseDir ? baseDir : '';
            if (location.protocol === 'file:' && baseDir.startsWith('/')) {
                return baseDir.slice(1);
            } else if (location.protocol !== 'file:' && !baseDir.startsWith('/')) {
                return `/${baseDir}`;
            }
            return baseDir;
        })();

        this.#baseUrl = (() => {
            if (typeof window === 'undefined') return;

            const {protocol, host, pathname} = location;
            if (location.protocol === 'file:') {
                const path = pathname.split('/');
                path.pop(); // Remove 'index.html'
                path.join('/');
                return `${protocol}//${path}`;
            } else {
                const baseUrl = this.#baseDir === '/' ? '' : this.#baseDir;
                return `${protocol}//${host}${baseUrl}`;
            }
        })();

        this.#import = new BeyondImport(this.#mode, this.#baseUrl);
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

/**
 * In local environment, beyond set the global variable __beyond_config
 * In production environments, the beyond configuration is expected to be done by calling the following methods:
 * beyond.setup, beyond.application.setup and beyond.libraries.register
 */
if (typeof __beyond_config === 'object') {
    const {distribution, application, libraries} = __beyond_config;
    beyond.setup(distribution);
    beyond.application.setup(application);
    beyond.libraries.register(libraries);
}
