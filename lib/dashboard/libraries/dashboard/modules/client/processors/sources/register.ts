import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'version', 'code', 'hash', 'file', 'filename', 'dirname', 'basename', 'extname', 'relative'
];

specs.batch = {
    actions: {
        list: 'applications/modules/bundles/processors/sources/list',
        data: 'applications/modules/bundles/processors/sources/data'
    }
};
specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    sources: {
        fields: ['processor']
    }
};

tables.register('processors-sources', specs);
