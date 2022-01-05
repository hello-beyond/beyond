import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'name', 'processors', 'multilanguage'
];

specs.batch = {
    actions: {
        list: 'bundles/list',
        data: 'bundles/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('global-bundles', specs);
