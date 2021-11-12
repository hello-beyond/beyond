import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative', 'pathname'
];

specs.batch = {
    actions: {
        list: 'applications/static/list',
        data: 'applications/static/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    applications: {
        fields: ['application']
    }
};

tables.register('applications-static', specs);
