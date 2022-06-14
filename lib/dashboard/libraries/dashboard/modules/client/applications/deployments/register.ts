import {module} from "beyond_context";
import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {ApplicationDistribution} from "./distributions/item";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'valid', 'errors', 'distributions'
];

specs.properties = {
    distributions: {
        Items: ApplicationDistribution,
        table: 'applications-distributions',
        identifier: {field: 'id', source: 'distributions'}
    }
}
specs.batch = {
    actions: {
        list: 'applications/deployments/list',
        data: 'applications/deployments/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('applications-deployments', specs);
