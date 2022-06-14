import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {TemplateProcessorsSources} from "./sources/collection";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'processor', 'path', 'errors', 'warnings'
];

specs.properties = {
    sources: {
        Collection: TemplateProcessorsSources,
        table: 'template-processors-sources',
        filter: [{field: 'id', source: 'id'}]
    }
};

specs.batch = {
    actions: {
        list: '',
        data: 'templates/processors/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('template-processors', specs);
