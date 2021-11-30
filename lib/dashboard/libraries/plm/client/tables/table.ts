import {Properties, PropertySpecsUnion} from "./properties/properties";
import {Indices, IndicesSpecs} from "./indices/indices";
import {LocalDB} from "./local-database/local-database";
import {Queries} from "./queries/queries";
import {Module} from "@beyond-js/kernel/core/ts";
import {ListsManager} from "./data/lists/manager/manager";
import {RecordsManager} from "./data/records/manager";
import {CountersManager} from "./data/counter/manager";

interface CacheSpecs {
    enabled: boolean
    limit?: number
}

interface TableBatchConfig {
    actions: {
        data: string,
        list: string,
        count?: string
    }
    max?: number
}

export /*bundle*/
interface TableSpecs {
    cache: CacheSpecs | undefined | boolean
    module: Module
    version?: number
    batch: TableBatchConfig
    indices: IndicesSpecs
    fields: string[]
    properties?: Record<string, PropertySpecsUnion>
}

/**
 * Table data access
 *
 * @param name {string} The table name
 * @param specs {object} The table specification
 * @constructor
 */

export class Table {
    readonly #name: string;
    readonly #specs: TableSpecs;

    get name() {
        return this.#name;
    }

    get version() {
        return this.#specs.version;
    }

    get cache(): CacheSpecs {
        return <CacheSpecs>this.#specs.cache;
    }

    get module() {
        return this.#specs.module;
    }

    get batch() {
        return this.#specs.batch;
    }

    get fields(): string[] {
        return this.#specs.fields.slice();
    }

    readonly #properties: Properties;
    get properties() {
        return this.#properties;
    }

    readonly #indices: Indices;
    get indices(): Indices {
        return this.#indices;
    }

    readonly #localDB = new LocalDB(this);
    get localDB() {
        return this.#localDB;
    }

    readonly #records = new RecordsManager(this);
    get records() {
        return this.#records;
    }

    readonly #lists = new ListsManager(this);
    get lists() {
        return this.#lists;
    }

    readonly #counters = new CountersManager(this);
    get counters() {
        return this.#counters;
    }


    readonly #queries: Queries;
    get queries() {
        return this.#queries;
    }

    constructor(name: string, specs: TableSpecs) {
        if (typeof specs.module !== 'object')
            throw new Error(`Invalid module specification on table "${name}"`);
        if (specs.version && typeof specs.version !== 'number')
            throw new Error('Invalid table version specification');
        if (!(specs.fields instanceof Array))
            throw new Error(`Invalid fields specification on table "${name}"`);
        if (specs.properties && typeof specs.properties !== 'object')
            throw new Error(`Invalid properties specification on table "${name}"`);
        if (typeof specs.batch !== 'object' || typeof specs.batch.actions !== 'object')
            throw new Error(`Invalid batch specification on table "${name}"`);
        if (specs.indices && typeof specs.indices !== 'object')
            throw new Error(`Invalid indices specification on table "${name}"`);
        if (typeof name !== 'string' || !name)
            throw new Error('Invalid table name parameter');

        specs.version = specs.version ? specs.version : 1;

        this.#name = name;
        this.#specs = specs;

        if (!['boolean', 'object', 'undefined'].includes(typeof this.#specs.cache)) {
            console.warn(`Invalid cache specification on table "${name}"`, specs);
        }
        this.#specs.cache === undefined ? this.#specs.cache = {enabled: false} : null;
        typeof this.#specs.cache === 'boolean' ? this.#specs.cache = {enabled: this.#specs.cache} : null;
        typeof this.#specs.cache === 'object' && !this.#specs.cache.hasOwnProperty('limit') ?
            this.#specs.cache.limit = 30 : null;

        this.#indices = new Indices(this, specs.indices);
        this.#properties = new Properties(this, specs.properties);

        this.#queries = new Queries(this);

        this.#localDB.prepare().catch(exc => console.error(exc.stack));
    }

    validate(): boolean {
        this.#properties.validate();
        return true;
    }
}
