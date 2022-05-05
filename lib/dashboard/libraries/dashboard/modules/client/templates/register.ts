import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {TemplateGlobal} from "./global/item";
import {TemplateProcessor} from "./processors/item";
import {TemplateApplication} from "./applications/item";
import {TemplateOverwrites} from "./overwrites/collection";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'application', 'processors', 'path', 'errors', 'warnings'
];

specs.properties = {
    application: {
        Item: TemplateApplication,
        table: 'template-application',
        identifier: [{field: 'id', source: 'id'}]
    },
    global: {
        Item: TemplateGlobal,
        table: 'template-global',
        identifier: [{field: 'id', source: 'id'}]
    },
    processors: {
        Items: TemplateProcessor,
        table: 'template-processors',
        identifier: {field: 'id', source: 'processors'}
    },
    overwrites: {
        Collection: TemplateOverwrites,
        table: 'template-overwrites',
        filter: [{field: 'application', source: 'id'}]
    }
};

specs.batch = {
    actions: {
        list: '',
        data: 'templates/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('templates', specs);
