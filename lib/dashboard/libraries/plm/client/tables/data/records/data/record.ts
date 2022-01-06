import {Events} from "@beyond-js/kernel/core/ts";
import {Fields} from "./fields/fields";
import {RecordIdentifiers} from "./identifiers";
import {RecordLoader} from "./loader";
import {RecordFetcher} from "./fetcher";
import {createUUID} from "../../uuid";
import type {RecordsDataFactory} from "./factory";
import type {Field} from "./fields/field";

export type RecordIdentifier = Record<string, string | number | boolean>

export interface RecordDataVersion {
    value?: number
}

export class RecordData extends Events {
    readonly #manager: RecordsDataFactory;
    get manager(): RecordsDataFactory {
        return this.#manager;
    }

    get table() {
        return this.#manager.table;
    }

    readonly #fields: Fields;
    get fields() {
        return this.#fields;
    }

    readonly #identifiers: RecordIdentifiers;
    get identifiers() {
        return this.#identifiers;
    }

    readonly #localId: string;
    get localId() {
        return this.#localId;
    }

    #version: RecordDataVersion = {};
    get version() {
        return this.#version.value;
    }

    // The local store, properties and methods
    readonly #loader = new RecordLoader(this, this.#version);
    get loader() {
        return this.#loader;
    }

    get loaded() {
        return this.#loader.loaded;
    }

    async load() {
        if (this.#destroyed) throw new Error('Record is destroyed');
        this.#found = await this.#loader.load();
    }

    // The fetch manager, properties and methods
    readonly #fetcher = new RecordFetcher(this, this.#version);

    get fetching() {
        return this.#fetcher.fetching
    }

    get fetched() {
        return this.#fetcher.fetched
    }

    get landed() {
        return this.loaded || this.fetched
    }

    #found = false
    get found() {
        return this.#found
    }

    async fetch() {
        if (this.#destroyed) throw new Error('Record is destroyed');
        this.#found = await this.#fetcher.fetch();
    }

    /**
     * The record is expected to be back-end persisted when:
     *   . At least an identifier is set, example: if it was created a user with
     *   an identifier by its "nickname" = "..". In this case it is expected that the record
     *   was instantiated to be loaded
     *   . When the primary key is set
     * @returns {boolean}
     */
    get persisted(): boolean {
        if (this.#identifiers.size) return true;

        const pk = this.table.indices.primary.fields[0];
        return this.#fields.get(pk).assigned;
    }

    /**
     * Returns the primary key field
     * @returns {*} the value
     */
    get pk(): Field {
        const pk = this.table.indices.primary.fields[0];
        return this.#fields.get(pk);
    }

    #invalidated = false;

    // For realtime notifications to indicate that the list has changed
    invalidate() {
        this.#invalidated = true;
        this.trigger('invalidated');
    }

    /**
     * RecordData Constructor
     * @param {RecordsDataFactory} manager
     * @param {string | RecordIdentifier} identifier Can be the localId (string)
     * or the initial identifier (RecordIdentifier)
     * @param {string} session
     */
    constructor(manager: RecordsDataFactory, identifier: string | RecordIdentifier, session?: string) {
        super();
        this.#manager = manager;

        // If the initial identifier is not set, then it is a locally created record
        if (typeof identifier === 'string') this.#localId = createUUID();

        const initialIdentifier = typeof identifier === 'object' ? <RecordIdentifier>identifier : undefined;
        this.#identifiers = new RecordIdentifiers(this, initialIdentifier);

        this.#fields = new Fields(this);
    }

    #destroyed = false;

    destroy() {
        if (this.#destroyed) {
            throw new Error('Record already destroyed');
        }
        this.#destroyed = true;

        super.destroy();
    }
}
