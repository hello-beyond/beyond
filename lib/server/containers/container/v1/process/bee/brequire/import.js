module.exports = function (bundles) {
    /**
     * Import a module
     *
     * @param uri {string} The uri being imported
     * @param version? {number} The version number to support HMR
     * @return {Promise<*>}
     */
    const bimport = async (uri, version) => {
        if (uri.startsWith('.')) {
            throw new Error('Relative requires should never be called by BeyondJS bundles in a BEE environment');
        }

        // Process the uri as a BeyondJS bundle
        const imported = await bundles.import(uri, version);
        const processed = imported && require('./process')(uri, imported);
        if (processed) return processed;

        const resolved = require.resolve(uri, {paths: [bundles.application.path]});
        if (!resolved) {
            require('../log')(bundles.application, {
                type: 'import.resolution.error',
                uri
            });
            throw new Error(`Resource "${uri}" not found`);
        }

        // At this point, the resource should be a node-js package
        let required;
        try {
            required = await import(resolved);
        }
        catch (exc) {
            require('../log')(bundles.application, {
                type: 'import.error',
                uri,
                exc: exc.stack
            });
            throw exc;
        }
        return required;
    }

    Object.defineProperty(global, 'bimport', {get: () => bimport});
}
