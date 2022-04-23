/**
 * Interprocess communication exposed actions
 *
 * @param instances {Map} The server instances (main, dashboard)
 */
module.exports = function (instances) {
    'use strict';

    const {ipc} = global.utils;
    const procedures = new Map;

    require('./actions').forEach(action => ipc.handle(action, async (...params) => {
        const split = action.split('/');
        const method = split.pop();
        let path = `./${split.join('/')}`;

        let procedure;
        if (procedures.has(path)) {
            procedure = procedures.get(path);
        }
        else {
            const p = new (require(path))(instances);
            procedures.set(path, p);
            procedure = p;
        }
        return await procedure[method](...params);
    }));
}