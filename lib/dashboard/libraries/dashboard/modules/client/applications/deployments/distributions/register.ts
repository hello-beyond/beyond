import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'name', 'local', 'ssr', 'port', 'ts', 'amd',
    'platform', 'environment', 'compress', 'default'
];

specs.batch = {
    actions: {
        list: 'applications/deployments/distributions/list',
        data: 'applications/deployments/distributions/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('applications-distributions', specs);