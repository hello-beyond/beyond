import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {TemplateGlobalSources} from "./sources/collection";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'processor', 'path', 'files', 'errors', 'warnings',
];

specs.properties = {
    sources: {
        Collection: TemplateGlobalSources,
        table: 'template-global-sources',
        filter: [{field: 'application', source: 'id'}]
    }
};

specs.batch = {
    actions: {
        list: '',
        data: 'templates/global/data'
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('template-global', specs);
