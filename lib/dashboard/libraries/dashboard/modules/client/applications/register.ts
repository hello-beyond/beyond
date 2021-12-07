import {tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {Bee} from "../bees/item";
import {Template} from "../templates/item";
import {ApplicationStatics} from "./static/collection";
import {ApplicationModules} from "./modules/collection";
import {ApplicationDeployment} from "./deployments/item";
import {ApplicationLibraries} from "./libraries/collection";

const specs = <TableSpecs>{};

specs.cache = false;
specs.module = module;

//TODO check fields @box 'servers', 'builds','declarations'
specs.fields = [
    'id', 'path', 'name', 'title', 'description', 'developer',
    'version', 'connect', 'hosts', 'port', 'static', 'modulesPath',
    'bee', 'errors', 'warnings',
    'servers', 'builds', 'declarations'
];

specs.properties = {
    am: {
        Collection: ApplicationModules,
        table: 'applications-modules',
        filter: [{field: 'application', source: 'id'}]
    },
    libraries: {
        Collection: ApplicationLibraries,
        table: 'applications-libraries',
        filter: [{field: 'application', source: 'id'}]
    },
    bee: {
        Item: Bee,
        table: 'bees',
        immutable: true,
        identifier: [{field: 'id', source: 'bee'}]
    },
    template: {
        Item: Template,
        table: 'templates',
        immutable: true,
        identifier: [{field: 'id', source: 'id'}]
    },
    static: {
        Collection: ApplicationStatics,
        table: 'applications-static',
        filter: [{field: 'application', source: 'id'}]
    },
    deployment: {
        Item: ApplicationDeployment,
        table: 'applications-deployments',
        immutable: true,
        identifier: [{field: 'id', source: 'id'}]
    },
};

specs.batch = {
    actions: {
        list: 'applications/list',
        data: 'applications/data',
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

tables.register('applications', specs);