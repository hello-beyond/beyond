const Module = require('module');
const {ipc} = global.utils;

module.exports = async function (bee) {
    const log = ({errors, exc}) => {
        console.error(`Error loading application configuration`, errors, exc?.stack);
        require('../log')(bee.application, {
            type: 'config.error',
            errors: errors,
            exc: exc instanceof Error ? exc.beyond : void 0
        });
    }

    try {
        const distribution = require('../distribution')(bee.is);
        const {code, errors} = await ipc.exec('main-client', 'code/config/get', bee.application.id, distribution);
        if (errors?.length) return log({errors});

        const compiled = new Module('config');
        try {
            compiled._compile(code, `/node_modules/config.js`);
        }
        catch (exc) {
            log({errors: ['Error compiling application configuration'], exc});
        }
    }
    catch (exc) {
        log({errors: ['Error found loading application configuration'], exc});
    }
}
