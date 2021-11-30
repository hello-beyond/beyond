import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {Bundle} from "../../bundles/item";
import {Declaration} from "../../declarations/item";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'is', 'version', 'external', 'resource', 'errors', 'warnings',
    'bundle_id', 'declaration'
];
specs.properties = {
    bundle: {
        Item: Bundle,
        table: 'bundles',
        identifier: [{field: 'id', source: 'bundle_id'}]
    },
    declaration: {
        Item: Declaration,
        table: 'declarations',
        identifier: [{field: 'id', source: 'declaration'}]
    }
};


//TODO @ftovar crear propiedad de tipo Items a la tabla processor-sources con el campo is como relacion

specs.batch = {
    actions: {
        list: 'applications/modules/bundles/processors/dependencies/list',
        data: 'applications/modules/bundles/processors/dependencies/data',
    }
};
specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    dependencies: {
        fields: ['processor']
    }
};

tables.register('processors-dependencies', specs);
