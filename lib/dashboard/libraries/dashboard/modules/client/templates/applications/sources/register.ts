import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'version', 'processor', 'code',
    'file', 'filename', 'dirname', 'basename', 'extname', 'relative'
];

specs.batch = {
    actions: {
        list: 'templates/applications/sources/list',
        data: 'templates/applications/sources/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    sources: {
        fields: ['application']
    }
};

tables.register('template-application-sources', specs);
