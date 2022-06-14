import {Batch} from "./batch/batch";
import type {FilterSpecs} from "../data/filter/filter";
import type {ListAttributes} from "../data/lists/list";
import type {Table} from "../table";

type CachedList = Record<string | number, number>;

interface ListQueryRequest {
    action: string,
    attributes: ListAttributes
    index?: string,
    filter?: FilterSpecs,
    cached: CachedList
}

export type QueryRecordResponse = Record<string, any>

export interface ListQueryRecordResponse {
    uptodate: boolean,
    pk?: string,
    version?: number,
    data?: QueryRecordResponse
}

type ListQueryResponse = ListQueryRecordResponse[]

export class ListQuery {
    #table;
    #batch: Batch<ListQueryRequest, ListQueryResponse>

    constructor(table: Table) {
        this.#table = table;
        this.#batch = new Batch({
            module: table.module,
            action: table.batch.actions.list,
            max: table.batch.max
        });
    }

    /**
     * Returns the cached version of the list as an object where the key is the primary key of the record,
     * and the value is its version
     *
     * @param {FilterSpecs} filter
     * @param {ListAttributes} attributes
     * @returns {Record<string, number>}
     */
    #cached = async (filter: FilterSpecs, attributes: ListAttributes): Promise<CachedList> => {
        let output: CachedList = {};

        let cached = await this.#table.localDB.lists.load(filter, attributes);
        if (cached && !(cached.data instanceof Array)) {
            console.warn('Cache of list is invalid.', '\n', cached);
            cached = undefined;
        }

        if (!cached) return;

        const records = cached.data;
        for (const record of records) {
            const index = this.#table.indices.primary;
            const pk = index.fields[0];
            const fields: Record<string, string | number> = {};
            fields[pk] = record;

            let cached = await this.#table.localDB.records.load(index.name, fields, attributes.accessToken);
            if (cached) {
                output[record] = cached.version;
            }
        }

        return output;
    };

    /**
     * Creates a ListQueryRequest
     *
     * @param {FilterSpecs} filter
     * @param {ListAttributes} attributes
     * @returns {ListQueryRequest}
     */
    #request = async (filter: FilterSpecs, attributes: ListAttributes): Promise<ListQueryRequest> => {
        const cached: CachedList = await this.#cached(filter, attributes);

        const fields: Record<string, any> = {};
        filter = filter ? filter : [];
        let count = 0;
        filter.map(condition => {
            count++;
            fields[condition.field] = condition.value;
        });

        const index = count ? this.#table.indices.select('list', fields) : undefined;
        if (count && !index) {
            const message = `No index found in table "${this.#table.name}" ` +
                `that can be used to solve a "list" request.\n\n`;
            console.error(message, filter, '\n', fields);
            throw new Error(message);
        }

        const request = {
            action: 'list',
            attributes: attributes,
            cached: cached
        }
        count && Object.assign(request, {
            index: index.name,
            filter: filter,
        });

        return request;
    }

    /**
     * Executes a list query
     *
     * @param {FilterSpecs} filter
     * @param {ListAttributes} attributes
     * @returns {Promise<(string | number)[]>}
     */
    async exec(filter: FilterSpecs, attributes: ListAttributes): Promise<(string | number)[]> {
        const request = await this.#request(filter, attributes);
        const response = await this.#batch.exec(request);

        if (!(response instanceof Array)) {
            console.error(`Invalid response received on query "list" to table "${this.#table.name}".\n\n`,
                request, '\n', response);
            return [];
        }

        // Save to the local database the list and the records data
        const listIds: (string | number)[] = [];
        for (const record of response) {
            if (!record.uptodate) {
                const pk = this.#table.indices.primary.fields[0];
                if (!record.data.hasOwnProperty(pk)) {
                    console.error(`Error on "list" query. Record of table "${this.#table.name}" ` +
                        `does not have its primary key field "${pk}".\n\n`, request, record);
                    continue;
                }

                // Verify that the version of the received record is newer
                record.version = record.version ? record.version : (record as any).tu;
                const {cached} = request;
                const version = cached && cached.hasOwnProperty(record.data[pk]) ? cached[record.data[pk]] : 0;

                if (version && version >= record.version) {
                    console.warn('The record version of the received fetch is not improved.\n' +
                        `Cached version was "${version}" and the record received version is "${record.version}"`);
                }

                listIds.push(record.data[pk]);
            } else {
                listIds.push(record.pk);
            }

            this.#table.localDB.records.save(record.data, record.version, attributes.accessToken)
                .catch(error => console.error(`Error saving record of table "${this.#table.name}" to local storage.\n\n`,
                    error, '\n', request, '\n', record));
        }

        this.#table.localDB.lists.save(filter, attributes, listIds)
            .catch(error => console.error(`Error saving list of table "${this.#table.name}" to local storage.\n\n`,
                error, '\n', request, '\n', listIds));

        return listIds;
    }
}
