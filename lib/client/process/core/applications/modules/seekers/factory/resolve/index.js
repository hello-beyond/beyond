module.exports = function (resource, application) {
    // Check if it is an internal node module
    try {
        const resolved = require.resolve(resource);
        return resolved === resource ? 'node.internal' : 'node';
    }
    catch (exc) {
        void (exc);
    }

    // Resolve to check if it is a node module
    const {errors} = require('./resolve')(resource, application);
    return errors ? void 0 : 'node';
}
