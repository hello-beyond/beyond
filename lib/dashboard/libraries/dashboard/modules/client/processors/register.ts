import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {ProcessorCompiler} from "./compilers/item";
import {ProcessorSources} from "./sources/collection";
import {ProcessorOverwrites} from "./overwrites/collection";
import {ProcessorDependencies} from "./dependencies/collection";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'name', 'path', 'updated', 'destroyed', 'multilanguage', 'warnings'
];

specs.properties = {
    sources: {
        Collection: ProcessorSources,
        table: 'processors-sources',
        filter: [{field: 'processor', source: 'id'}]
    },
    overwrites: {
        Collection: ProcessorOverwrites,
        table: 'processors-overwrites',
        filter: [{field: 'processor', source: 'id'}]
    },
    dependencies: {
        Collection: ProcessorDependencies,
        table: 'processors-dependencies',
        filter: [{field: 'processor', source: 'id'}]
    },
    compiler: {
        Item: ProcessorCompiler,
        table: 'processors-compilers',
        identifier: [{field: 'id', source: 'id'}]
    }
};

specs.batch = {
    actions: {
        list: '',
        data: 'applications/modules/bundles/processors/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('processors', specs);
