import {Item, tables, TableSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {Bundle} from "../bundles/item";
import {Library} from "../libraries/item";
import {Application} from "../applications/item";
import {ModuleStatics} from "./static/collection";

const specs = <TableSpecs>{};

specs.module = module;
specs.cache = false;

specs.fields = [
    'id', 'name', 'tu', 'path', 'pathname', 'title', 'description',
    'hmr', 'bundles', 'container', 'errors', 'warnings'
];

specs.properties = {
    bundles: {
        Items: Bundle,
        table: 'bundles',
        identifier: {field: 'id', source: 'bundles'}
    },
    static: {
        Collection: ModuleStatics,
        table: 'modules-static',
        filter: [{field: 'module', source: 'id'}]
    },
    container: {
        tables: ['applications', 'libraries'],
        selector: (item: Item) => {
            const container = item.fields.get('container');

            if (!container.assigned) return;

            if (typeof container !== 'object') {
                console.warn('Invalid container value', container);
                return;
            }

            const {is, name} = container.value;
            if (!['application', 'library'].includes(is)) {
                console.warn(`Invalid container type "${is}"`);
                return;
            }

            return {
                Item: is === 'application' ? Application : Library,
                table: is === 'application' ? 'application' : 'library',
                identifier: {name: name}
            }
        }
    }
};

specs.batch = {
    actions: {
        list: 'modules/list',
        data: 'modules/data',
    }
};

specs.indices = {
    id: {
        fields: ['id'],
        primary: true
    }
};

tables.register('modules', specs);