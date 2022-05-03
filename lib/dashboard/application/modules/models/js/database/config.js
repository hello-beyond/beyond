function getConfig() {

    const CONFIG = Object.freeze({
        DB: 'beyond.dashboard',
        VERSION: 6
    });

    //TODO validar uso de tablas list, records, storages y unpublished
    const tables = {
        favorites: {
            name: 'favorites',
            config: {keyPath: 'id', autoIncrement: true},
            indexes: [
                ['id', 'id', {unique: true}],
                ['name', 'name', {unique: true}],
                ['items', 'items', {unique: false}],
            ]
        },
        workspaces: {
            name: 'workspaces',
            config: {keyPath: 'wd'},
            indexes: [
                ['wd', 'wd', {unique: true}],
                ['lastAccess', 'lastAccess'],
            ]
        },
        user: {
            name: 'user',
            config: {keyPath: 'id', autoIncrement: true},
            indexes: [
                ['id', 'id', {unique: true}],
                ['email', 'email', {unique: true}],
                ['cover', 'cover']
            ]
        },
        workspace: {
            name: 'workspace',
            config: {keyPath: 'wd', autoIncrement: true},
            indexes: [
                ['id', 'id', {unique: true}],
                ['panels', 'panels'],
                ['config', 'config'],
                ['wd', 'wd', {unique: true}]
            ]
        },

    };

    const stores = [];
    for (const store in tables) {
        stores.push(tables[store]);
    }

    return {
        name: CONFIG.DB,
        version: CONFIG.VERSION,
        stores: stores
    };

}
