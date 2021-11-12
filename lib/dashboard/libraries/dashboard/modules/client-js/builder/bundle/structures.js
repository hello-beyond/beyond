const Structures = {
    module: {
        fields: [
            'id', 'name', 'title', 'description', 'developer', 'author',
            'template', 'styles', 'server', 'multilanguage'
        ]
    },
    page: {
        fields: ['vdir', 'route', 'layoutId'],
        required: ['route', 'name'],
        processors: ['ts', 'jsx'],
        dependencies: ['layout']
    },
    code: {
        required: ['name', 'developer'],
        processors: ['ts', 'jsx']
    },
    layout: {
        required: ['name'],
        processors: ['ts', 'jsx']
    },
    ts: {
        required: ['name']
    },
    js: {
        required: ['name']
    }
};