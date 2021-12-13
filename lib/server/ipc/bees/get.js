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
    // kind can be 'node', 'backend', 'ssr'
    let [type, id, kind] = split;
    if (!['application', 'library'].includes(type)) throw new Error(`Invalid container type "${type}"`);

    // Check if kind is valid
    const kinds = new Set(['node', 'backend', 'ssr', 'legacy']);
    if (kind && !kinds.has(kind)) throw new Error(`Invalid bee kind "${kind}"`);

    id = parseInt(id);
    if (isNaN(id)) throw new Error(`Container id "${id}" should be a number`);

    const path = await ipc.exec('main', 'ids.path/get', id);
    if (!path) throw new Error(`Container id "${id}" not found`);

    type = type === 'application' ? 'applications' : 'libraries';
    await containers[type].ready;

    const container = containers[type].has(path) ? containers[type].get(path) : undefined;
    await container?.ready;
    if (!container) return;

    let bee;

    // Infer the bee kind if it was not specified
    const infer = async () => {
        const check = async (kind) => {
            const bee = container[kind];
            if (!bee) throw new Error(`BEE kind "${kind}" not found`);
            await bee.ready;
            return bee.configured ? bee : void 0;
        }

        return await (async () => {
            for (const kind of kinds) {
                if (kind === 'ssr') continue;
                const found = await check(kind);
                if (found) return found;
            }
        })();
    }

    bee = kind ? container[kind] : await infer();
    if (!bee) return;

    !bee.processed && await bee?.ready;
    return bee;
}
