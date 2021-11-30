function getConfig() {

    const CONFIG = Object.freeze({
        DB: 'beyond.dashboard',
        VERSION: 4
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
        workspace: {
            name: 'workspace',
            config: {keyPath: 'id', autoIncrement: true},
            indexes: [
                ['id', 'id', {unique: true}],
                ['application', 'application', {unique: true}],
                ['panels', 'panels'],
                ['config', 'config'],
            ]
        }

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