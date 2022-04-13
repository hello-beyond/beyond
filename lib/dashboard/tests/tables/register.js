tables.register('graphs', {
    'module': module,
    'fields': ['owner_id', 'container_id', 'entity_id'],
    'indices': {
        'ids': {
            'fields': ['id'],
            'primary': true
        },
        'coe': { // oce means the 'c' of containers, the 'o' of owners, and the 'e' of entities
            'fields': ['container_id', 'owner_id', 'entity_id'],
            'groups': ['container_id']
        },
        'c': { // 'c' of containers
            'fields': ['container_id']
        }
    },
    'actions': {
        'publish': 'graphs/publish',
        'list': 'graphs/list',
        'count': 'graphs/count',
        'tu': 'graphs/tu',
        'data': 'graphs/data'
    }
});

tables.register('relations', {
    'module': module,
    'fields': ['relation_entity', 'from_id', 'to_id'],
    'indices': {
        'ids': {
            'fields': ['ids'],
            'primary': true
        },
        'er_from_to': {
            'fields': ['relation_entity', 'from_id', 'to_id'],
            'unique': true,
            'batched': ['from_id', 'to_id']
        },
        'from_id': {
            'fields': ['from_id']
        }
    },
    'actions': {
        'publish': 'relations/publish',
        'list': 'relations/list',
        'count': 'relations/count',
        'tu': 'relations/tu',
        'data': 'relations/data'
    }
});
