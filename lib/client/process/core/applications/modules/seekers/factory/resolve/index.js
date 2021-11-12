module.exports = function (resource, application) {
    // Check if it is an internal node module
    if (!resource.includes('/')) {
        try {
            const resolved = require.resolve(resource);
            if (resolved === resource) return 'node.internal';
        }
        catch (exc) {
            void (exc);
        }
    }

    const {errors} = require('./resolve')(resource, application);
    return errors ? void 0 : 'node';
}
