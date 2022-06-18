import {Application, IApplicationConfig} from './application/application';
import {BeyondImport} from "./import";

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
    application?: IApplicationConfig
}

declare const __beyond_config: IBeyondConfig;

export class Beyond {
    #application = new Application(this);
    get application() {
        return this.#application;
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
    // Note: in AMD mode, the querystring is not allowed (it is used require.undef by the beyond.reload method)
    reload = (module: string, version: number): Promise<any> => this.#import.reload(module, version);
    require = (module: string): Promise<any> => this.#import.require(module);

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
            if (protocol === 'file:') {
                const path = pathname.split('/');
                path.pop(); // Remove 'index.html'
                path.join('/');
                return `${protocol}//${path.join('/')}`;
            } else {
                const baseUrl = this.#baseDir === '/' ? '' : this.#baseDir;
                return `${protocol}//${host}${baseUrl}`;
            }
        })();

        this.#import = new BeyondImport(this.#mode, this.#baseUrl);
    }
}

export /*bundle*/ const beyond = new Beyond;
(<any>globalThis).beyond = beyond;

if (typeof __beyond_config === 'object') {
    const {distribution, application} = __beyond_config;
    beyond.setup(distribution);
    beyond.application.setup(application);
}
