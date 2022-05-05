import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'code', 'processed', 'errors', 'warnings'
];
specs.batch = {
    actions: {
        list: '',
        data: 'declarations/data'
    }
};
specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('declarations', specs);
