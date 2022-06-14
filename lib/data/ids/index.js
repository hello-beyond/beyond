const {ipc, crc32} = global.utils;

const ids = new Map;
ipc.handle('ids.path/generate', path => {
    if (typeof path !== 'string' || !path) throw new Error('Invalid parameters');

    const id = ids.has(path) ? ids.get(path) : crc32(path);
    ids.set(path, id);
    return id;
});

ipc.handle('ids.path/get', params => {
    const find = id => {
        if (typeof id !== 'number') throw new Error(`Parameter id must be a number, but "${typeof id}" was received`);
        const found = [...ids].find(entry => id === entry[1]);
        return found?.[0];
    };

    return params instanceof Array ? params.map(id => find(id)) : find(params);
});

