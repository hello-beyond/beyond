import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;
specs.fields = [
    'id', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative',
    'pathname', 'overwrite'
];

specs.batch = {
    actions: {
        list: 'modules/static/list',
        data: 'modules/static/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    modules: {
        fields: ['module']
    }
};

tables.register('modules-static', specs);
