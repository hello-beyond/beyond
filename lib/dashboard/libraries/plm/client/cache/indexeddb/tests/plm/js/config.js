const getConfig = () => {
    'use strict';

    const CONFIG = Object.freeze({
        'DB': 'plmtest',
        'VERSION': 1
    });

    const lists = {
        'name': 'lists',
        'config': {'keyPath': 'id', 'autoIncrement': true},
        'indexes': [
            ['id', 'id', {'unique': false}]
        ]
    };

    const records = {
        'name': 'records',
        'config': {'keyPath': 'id', 'autoIncrement': true},
        'indexes': [
            ['id', 'id', {'unique': false}]
        ]
    };

    const unpublished = {
        'name': 'unpublished',
        'config': {'keyPath': 'id', 'autoIncrement': true},
        'indexes': [
            ['instanceId', 'instanceId', {'unique': false}]
        ]
    };

    return {
        'name': CONFIG.DB,
        'version': CONFIG.VERSION,
        'stores': [lists, records, unpublished]
    };

};
