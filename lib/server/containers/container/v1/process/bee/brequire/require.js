module.exports = class {
    #bundles;

    constructor(bundles) {
        this.#bundles = bundles;
    }

    // Node js require overridden function
    require = uri => {
        if (uri.startsWith('.')) {
            throw new Error('Relative requires should never be called by BeyondJS bundles in a BEE environment');
        }

        // Process the uri as a BeyondJS bundle
        let required = this.#bundles.require(uri);
        const processed = required && require('./process')(uri, required);
        if (processed) return processed;

        const resolved = require.resolve(uri, {paths: [this.#bundles.application.path]});
        if (!resolved) {
            require('../log')(this.#bundles.application, {
                type: 'import.resolution.error',
                uri
            });
            throw new Error(`Resource "${uri}" not found`);
        }

        // At this point, the resource should be a node-js package
        try {
            required = require(resolved);
        }
        catch (exc) {
            require('../log')(this.#bundles.application, {
                type: 'require.error',
                uri,
                exc: exc instanceof Error ? exc.beyond : void 0
            });
            throw exc;
        }
        return required;
    }
}
