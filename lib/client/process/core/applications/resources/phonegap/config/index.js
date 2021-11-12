module.exports = function (application, platform) {
    'use strict';

    let config = application.config.phonegap;
    config = config ? config : {};
    config = typeof config[platform] === 'object' ? config[platform] : config;

    const output = {};
    for (const key of Object.keys(config)) {
        if (typeof key === 'object' && ['android', 'ios'].includes(config[key])) {
            output[key] = config[key][platform];
            output[key] === undefined ? delete config[key] : null;
        }
        else {
            output[key] = config[key];
        }
    }

    output.version = typeof output.version === 'string' ? {'number': output.version} : output.version;

    let ajv = new (require('ajv'))();
    let validate = ajv.compile(require('./schema.json'));

    validate(output);

    if (validate.errors) {
        const message = 'Phonegap build configuration errors';
        throw new Error(message);
    }

    return output;
}
