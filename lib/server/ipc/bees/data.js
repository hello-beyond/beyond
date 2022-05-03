module.exports = instances => async function (rq, instance) {
    'use strict';

    const ids = typeof rq === 'string' ? [rq] : rq;
    instance = instance ? instance : 'main';
    if (!['main', 'dashboard'].includes(instance)) throw new Error(`Instance "${instance}" is invalid`);
    const {containers} = instances.get(instance);

    const output = {};
    for (const id of ids) {
        let bee;
        try {
            bee = await require('./get')(containers, id);
            if (!bee) continue;
        }
        catch (exc) {
            console.log(exc.stack);
            continue;
        }

        output[id] = {
            id: id,
            path: bee.container.path,
            errors: bee.errors,
            port: bee.port,
            status: bee.process?.status,
            exception: bee.process?.exception,
            pid: bee.process?.pid
        };
    }

    return typeof rq === 'string' ? output[rq] : output;
}
