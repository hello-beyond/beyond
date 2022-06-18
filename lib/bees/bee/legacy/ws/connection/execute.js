/**
 * Execute an action
 *
 * @param modules {object} The modules collection
 * @param session {object} The session object
 * @param rq {object} The request to be executed
 * @returns {function(*): (*|void)}
 */
module.exports = async function (modules, session, rq) {
    'use strict';

    if (!rq.id) {
        throw 'Action id not set';
    }
    else if (typeof rq.module !== 'string') {
        throw 'Module id is invalid or not set';
    }
    else if (typeof rq.action !== 'string' || !rq.action) {
        throw 'Action is invalid or not set';
    }
    else if (typeof rq.params !== 'undefined' && typeof rq.params !== 'object') {
        throw new Error('Invalid parameters')
    }

    if (!modules.has(rq.module)) {
        throw `Module "${rq.module}" not found`;
    }

    const module = modules.get(rq.module);
    return await module.execute(rq.action, ...rq.params, session);
}
