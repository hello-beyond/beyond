import {module} from "beyond_context";
import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {Application} from "../item";
import {Library} from "../../libraries/item";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = ['id', 'application', 'library'];

specs.properties = {
    application: {
        Item: Application,
        table: 'applications',
        identifier: [{field: 'id', source: 'application'}]
    },
    library: {
        Item: Library,
        table: 'libraries',
        identifier: [{field: 'id', source: 'library'}]
    }
};

specs.batch = {
    actions: {
        list: 'applications/libraries/list',
        data: 'applications/libraries/data',
        count: 'applications/libraries/count',
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

tables.register('applications-libraries', specs);