import {module} from "beyond_context";
import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {Library} from "../item";
import {Module} from "../../modules/item";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = ['id', 'library'];

specs.properties = {
    library: {
        Item: Library,
        table: 'libraries',
        identifier: [{field: 'id', source: 'library'}]
    },
    module: {
        Item: Module,
        table: 'modules',
        identifier: [{field: 'id', source: 'module'}]
    }
};

specs.batch = {
    actions: {
        list: 'libraries/modules/list',
        data: 'libraries/modules/data',
        count: 'libraries/modules/count'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    library: {
        fields: ['library'],
        batches: {library: ['list', 'count']}
    }
};

tables.register('libraries-modules', specs);