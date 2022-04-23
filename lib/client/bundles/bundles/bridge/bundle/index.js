module.exports = class extends global.Bundle {
    processConfig(config) {
        if (!['object', 'string'].includes(typeof config)) {
            return {errors: ['Invalid configuration']};
        }

        const reserved = ['path'];

        const value = {};
        for (const prop of reserved) {
            if (config[prop] === undefined) continue;
            (value[prop] = config[prop]);
            delete config[prop];
        }

        value.ts = config;
        return {value};
    }
}
