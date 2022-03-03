import {Events} from "../utils/events/events";

export interface ILanguagesConfig {
    // The value to be taken when the device language (or the previously local configured) is not supported
    default: string,
    supported: string[]
}

export class Languages extends Events {
    #config: ILanguagesConfig;
    #storage: Storage = typeof localStorage === 'object' ? localStorage : void 0;

    readonly #supported: Set<string>;
    get supported() {
        return this.#supported;
    }

    get default() {
        return this.#config.default;
    }

    #current: string;
    get current(): string {
        return this.#current;
    }

    #configure(value: string) {
        if (this.#current === value) return true;

        if (typeof value !== 'string' || value.length !== 2) {
            console.warn(`Configured language "${value}" is invalid`);
            return false;
        }

        if (value && !this.#supported.has(value)) {
            console.log(`Language "${value}" is not supported`);
            return false;
        }

        const previous = this.#current;
        this.#current = value;
        previous && this.trigger('change');
        return true;
    }

    set current(value: string) {
        if (!this.#configure(value)) return;
        this.#storage?.setItem('__beyond_language', value);
    }

    constructor(config: ILanguagesConfig) {
        super();

        // Check if the default language is valid
        if (config.default && typeof config.default !== 'string' || config.default.length !== 2) {
            console.log(`Default language "${config.default}" is invalid`);
            config.default = undefined;
        }

        // Check the supported languages, if not set, default will be english
        const def = config.default ? config.default : 'en';
        config.supported = config.supported instanceof Array ? config.supported : [def];
        !config.supported.length && config.supported.push(def);
        this.#supported = new Set(config.supported);

        // If default language not set or was invalid, take the first supported language
        config.default = config.default ? config.default : [...this.#supported][0];

        // If default language was configured, but not set in the supported list, warn it
        if (!this.#supported.has(config.default)) {
            console.warn(`Default language "${config.default}" is not supported by current application`);
            config.default = [...this.#supported][0];
        }

        this.#config = config;

        const configured = this.#storage?.getItem('__beyond_language');

        // Try to configure the locally previously configured language
        if (configured && this.#configure(configured)) return;

        // Try to configure the language configured in the device
        const device = typeof navigator === 'object' ? navigator.language.split('-')[0] : void 0;
        if (device && this.#configure(device)) return;

        this.#configure(config.default);
    }
}
