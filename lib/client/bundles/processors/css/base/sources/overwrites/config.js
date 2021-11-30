/**
 * Process template overwrite entry configuration
 *
 * @param overwrites {object} The overwrites finder collection
 * @param to {object} The template overwrite entry
 */
module.exports = function (overwrites, to) {
    let {config, path} = to;
    const {processorName, extname} = overwrites;
    if (!path || !config || !config[processorName]) return {};

    path = require('path').join(to.path, config.path ? config.path : '');
    config = config[processorName];
    path = require('path').join(path, config.path ? config.path : '');

    let includes = typeof config === 'string' || config instanceof Array ? config : config.files;
    includes = typeof includes === 'string' ? [includes] : includes;
    config = {includes: includes, extname: extname};

    return {path, config};
}
