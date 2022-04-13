const ts = require('typescript');

/**
 * Transform the declarations code of each module into their corresponding namespaces
 *
 * @param tsSources {Map<string, object>} The typescript sources
 */
module.exports = function (tsSources) {
    return tsSources.forEach((tsSource, module) => {
        const transform = require('./transform')(module);
        const transformed = ts.transform(tsSource, [transform]);
        tsSource.statements = [transformed.transformed[0]];
    });
}
