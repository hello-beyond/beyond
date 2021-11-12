const {ipc} = global.utils;

/**
 * Returns a backend from its id
 *
 * @param containers
 * @param requested
 */
module.exports = async function (containers, requested) {
    'use strict';

    const split = requested.split('/');
    if (split.length < 2 || split.length > 3) throw new Error(`Invalid container id "${requested}"`);

    // type must be 'application' or 'library'
    // id is the application or library id associated with its path
    // kind can be 'node', 'backend', 'ssr', if undefined, 'backend' will be taken as default
    let [type, id, kind = 'backend'] = split;
    if (!['application', 'library'].includes(type)) throw new Error(`Invalid container type "${type}"`);

    const kinds = new Set([void 0, 'node', 'backend', 'ssr', 'legacy']);
    if (!kinds.has(kind)) throw new Error(`Invalid bee kind "${kind}"`);

    id = parseInt(id);
    if (isNaN(id)) throw new Error(`Container id "${id}" should be a number`);

    const path = await ipc.exec('main', 'ids.path/get', id);
    if (!path) throw new Error(`Container id "${id}" not found`);

    type = type === 'application' ? 'applications' : 'libraries';
    await containers[type].ready;

    const container = containers[type].has(path) ? containers[type].get(path) : undefined;
    await container?.ready;
    if (!container) return;

    kind = kind ? kind : (container.backend ? 'backend' : 'legacy');
    let bee = container[kind];
    await bee?.ready;
    return bee;
}
