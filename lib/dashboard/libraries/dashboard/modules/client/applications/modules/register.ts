import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {Application} from "../item";
import {Module} from "../../modules/item";
import {Bundle} from "../../bundles/item";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = ['id', 'application', 'module', 'bundles',];

specs.properties = {
    application: {
        Item: Application,
        table: 'application',
        identifier: [{field: 'id', source: 'application'}]
    },
    module: {
        Item: Module,
        table: 'modules',
        identifier: [{field: 'id', source: 'module'}]
    },
    bundles: {
        Items: Bundle,
        table: 'bundles',
        identifier: {field: 'id', source: 'bundles'}
    }
};

specs.batch = {
    actions: {
        list: 'applications/modules/list',
        data: 'applications/modules/data',
        count: 'applications/modules/count',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    applications: {
        fields: ['application'],
        batches: {application: ['list', 'count']}
    }
};

tables.register('applications-modules', specs);