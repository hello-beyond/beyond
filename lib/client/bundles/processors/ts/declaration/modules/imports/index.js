const ts = require('typescript');

module.exports = function (tsSources) {
    const imports = new (require('./processor'))();
    Object.defineProperty(this, 'dependencies', {get: () => imports.dependencies});

    tsSources.forEach((source, module) => {
        const transform = require('./transform')(module, imports);
        const transformed = ts.transform(source, [transform]);
        tsSources.set(module, transformed.transformed[0]);
    });
}
