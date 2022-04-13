import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

//TODO @ftovar agregar field is
specs.fields = [
    'id', 'path', 'version', 'name', 'enabled',
    'status', 'builds', 'exception', 'port', 'pid', 'errors'
];

specs.batch = {
    actions: {
        list: '',
        data: 'bees/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('bees', specs);
