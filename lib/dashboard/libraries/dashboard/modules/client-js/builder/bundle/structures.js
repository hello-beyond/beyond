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
    widget: {
        required: ['name'],
        processors: ['ts', 'scss']
    },
    layout: {
        required: ['name'],
        processors: ['ts', 'jsx']
    },
    code: {
        required: ['name'],
        processors: ['ts', 'jsx']
    },
    bridge: {
        required: ['name']
    },
    ts: {
        required: ['name']
    },
    js: {
        required: ['name']
    }
};