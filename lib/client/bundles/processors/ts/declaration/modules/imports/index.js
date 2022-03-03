const ts = require('typescript');
const path = require('path');

module.exports = function (tsSources, sources) {
    const imports = new (require('./processor'))();
    Object.defineProperty(this, 'dependencies', {get: () => imports.dependencies});

    // Get a list of the internal modules. Extract the extname from the name of the files
    const ims = new Set([...sources.keys()].map(filename => {
        const extname = path.extname(filename);
        return filename.slice(0, filename.length - extname.length);
    }));

    tsSources.forEach((source, module) => {
        const transform = require('./transform')(module, imports, ims);
        const transformed = ts.transform(source, [transform]);
        tsSources.set(module, transformed.transformed[0]);
    });
}
