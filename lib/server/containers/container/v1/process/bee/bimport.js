module.exports = function (bundles) {
    const bimport = async (required) => {
        if (bundles.error) return;
        await bundles.import(required);
        if (bundles.error) return;

        const bundle = bundles.get(required);
        if (bundle.error) {
            console.log(`Error found requiring bundle "${required}"`);
            require('./log/stack')(bundle.error);
            throw new Error(`Bundle "${required}" is invalid`);
        }
        !bundle.compiled && bundle.compile();
        return bundle.compiled.exports;
    }

    Object.defineProperty(global, 'bimport', {get: () => bimport});
}
