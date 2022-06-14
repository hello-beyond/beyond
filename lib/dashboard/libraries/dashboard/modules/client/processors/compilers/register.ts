import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = ['id', 'diagnostics'];

specs.batch = {
    actions: {
        list: '',
        data: 'applications/modules/bundles/processors/compilers/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('processors-compilers', specs);
