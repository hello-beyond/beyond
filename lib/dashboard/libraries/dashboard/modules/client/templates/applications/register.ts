import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {TemplateApplicationsSources} from "./sources/collection";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'processor', 'path', 'files', 'errors', 'warnings',
];

specs.properties = {
    sources: {
        Collection: TemplateApplicationsSources,
        table: 'template-application-sources',
        filter: [{field: 'application', source: 'id'}]
    }
};

specs.batch = {
    actions: {
        list: '',
        data: 'templates/applications/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('template-application', specs);
