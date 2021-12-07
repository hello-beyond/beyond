import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {Bee} from "../bees/item";
import {LibrariesStatic} from "./static/item";
import {LibraryModules} from "./modules/collection";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'path', 'name', 'title', 'description', 'developer',
    'version', 'connect', 'hosts', 'port', 'static',
    'bee', 'errors', 'warnings'
];

specs.properties = {
    modules: {
        Collection: LibraryModules,
        table: 'libraries-modules',
        filter: [{field: 'library', source: 'id'}]
    },
    bee: {
        Item: Bee,
        table: 'bees',
        immutable: true,
        identifier: [{field: 'id', source: 'bee'}]
    },
    static: {
        Items: LibrariesStatic,
        table: 'libraries-static',
        identifier: {field: 'id', source: 'id'}
    }
};

specs.batch = {
    actions: {
        list: 'libraries/list',
        data: 'libraries/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    },
    name: {
        fields: ['name'],
        unique: true
    }
};

tables.register('libraries', specs);