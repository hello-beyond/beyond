module.exports = class extends global.ProcessorSource {
    // The content of the source is overwritten when it is a client bridge
    #content;
    get content() {
        return this.#content;
    }

    #dependencies;
    get dependencies() {
        return this.#dependencies;
    }

    #exports;
    get exports() {
        return this.#exports;
    }

    #bridge;
    get bridge() {
        return this.#bridge;
    }

    /**
     * Analyzer source constructor
     *
     * @param processor {object} The processor object
     * @param is {string} Can be 'source' or 'overwrite'
     * @param source {object} Optional. If not specified, the source will be hydrated
     * @param _interface {any} Optional. If not specified, it will be hydrated
     * @param bridge {any} Optional. If not specified, it will be hydrated
     * @param content {string} Optional. If not specified, it will be hydrated
     */
    constructor(processor, is, source, _interface, bridge, content) {
        super(processor, is, source);

        this.#dependencies = _interface?.dependencies;
        this.#exports = _interface?.exports;
        this.#bridge = bridge;
        this.#content = content ? content : source?.content;
    }

    hydrate(cached) {
        super.hydrate(cached);
        this.#dependencies = new Map(cached.dependencies);
        this.#exports = new Set(cached.exports);
        this.#content = cached.content;

        this.#bridge = cached.bridge ? new Map(cached.bridge) : void 0;
        this.#bridge?.forEach((methods, key) => this.#bridge.set(key, new Map(methods)));
    }

    toJSON() {
        const bridge = (() => {
            if (!this.#bridge) return;
            return [...this.#bridge].map(([key, methods]) => [key, [...methods]]);
        })();

        const json = {
            dependencies: [...this.#dependencies],
            exports: [...this.#exports],
            bridge: bridge,
            content: this.#content
        };

        return Object.assign(json, super.toJSON());
    }
}
