import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'version', 'processor', 'code',
    'file', 'filename', 'dirname', 'basename', 'extname', 'relative',
    'errors', 'warnings'
];

specs.batch = {
    actions: {
        list: 'templates/processors/sources/list',
        data: 'templates/processors/sources/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    sources: {
        fields: ['id']
    }
};

tables.register('template-processors-sources', specs);
