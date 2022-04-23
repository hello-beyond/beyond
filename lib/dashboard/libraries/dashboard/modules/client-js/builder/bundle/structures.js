const Structures = {
    module: {
        fields: [
            'id', 'name', 'title', 'description', 'developer', 'author',
            'template', 'styles', 'server', 'multilanguage'
        ]
    },
    page: {
        fields: ['vdir', 'route', 'layoutId', 'element'],
        required: ['route', 'name', 'element'],
        processors: ['ts', 'jsx'],
        dependencies: ['layout']
    },
    widget: {
        fields: ["element"],
        required: ['name', 'element'],
        processors: ['ts', 'scss']
    },
    layout: {
        fields: ["element"],
        required: ['name', 'element'],
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
