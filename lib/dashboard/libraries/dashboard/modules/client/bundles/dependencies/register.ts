import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id'
];
specs.batch = {
    actions: {
        list: 'bundles/dependencies/list',
        data: 'bundles/dependencies/data'
    }
};
specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('bundle-dependencies', specs);
