import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'path', 'application', 'module', 'bundle', 'processor',
    'errors', 'warnings'
];

specs.batch = {
    actions: {
        list: 'templates/overwrites/list',
        data: 'templates/overwrites/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    byApplication: {
        fields: ['application']
    }
};

tables.register('template-overwrites', specs);
