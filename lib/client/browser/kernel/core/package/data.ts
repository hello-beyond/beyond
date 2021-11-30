export class PackageData {
    readonly #id: string;
    get id() {
        return this.#id;
    }

    readonly #scope: string;
    get scope() {
        return this.#scope;
    }

    readonly #name: string;
    get name() {
        return this.#name;
    }

    /**
     * Package data constructor
     *
     * @param {string} id The id of the application, library or module
     */
    constructor(id: string) {
        if (!id) throw new Error('Package id not set');

        const split = id.split('/');
        if (split[0].startsWith('@')) {
            if (split.length < 2) throw new Error(`Package id "${id}" is invalid`);
            this.#scope = split.shift();
            this.#name = split.shift();
        } else {
            this.#name = split.shift();
        }

        this.#id = (this.#scope ? `${this.#scope}/` : '') + this.#name;
    }
}
