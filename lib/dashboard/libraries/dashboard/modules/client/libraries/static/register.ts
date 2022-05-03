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
        list: 'libraries/static/list',
        data: 'libraries/static/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('libraries-static', specs);
