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
        list: 'transversal/dependencies/list',
        data: 'transversal/dependencies/data'
    }
};
specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('transversal-dependencies', specs);
