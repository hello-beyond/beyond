/**
 * Processors configuration function
 *
 * @param config
 * @param specs {{extname: string[], excludes?: string[]}}
 * @return {{errors: [string]}|{path: (*|string), warnings: [], value: {excludes: Array, includes: Array, extname: *}}}
 */
module.exports = function (config, specs) {
    if (typeof specs !== 'object' || (typeof specs.extname !== 'string' && !(specs.extname instanceof Array))) {
        throw new Error('Invalid specification');
    }

    const warnings = [];

    let path, files, excludes;
    if (typeof config === 'string') {
        files = [config];
    }
    else if (config instanceof Array) {
        files = config;
    }
    else if (typeof config === 'object') {
        path = config.path;
        files = config.files;
        files = typeof files === 'string' ? [files] : files;
        excludes = config.excludes;
    }
    else if (config === undefined) {
        files = ['*'];
    }
    else {
        return {errors: ['Invalid configuration']};
    }

    if (!(files instanceof Array)) {
        return {errors: ['Files configuration not set']};
    }

    excludes = excludes ? excludes : [];
    if (!(excludes instanceof Array)) {
        warnings.push(`Excludes configuration is invalid`);
        excludes = [];
    }
    specs.excludes && (excludes = excludes.concat(specs.excludes));

    const value = {includes: files, excludes: excludes, extname: specs.extname};
    path = path ? path : '';

    return {path: path, value: value, warnings: warnings};
}
