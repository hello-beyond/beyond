import type {Table} from "../table";
import type {FilterSpecs} from "../data/filter/filter";
import type {ListAttributes} from "../data/lists/list";
import type {RecordStoreStructure} from "../local-database/records/records";
import type {CounterAttributes} from "../data/counter/counter";
import {DataQuery, DataQueryFields} from "./data";
import {ListQuery} from "./list";
import {CounterQuery} from "./counter";

export class Queries {
    readonly #data: DataQuery;
    readonly #list: ListQuery;
    readonly #counter: CounterQuery;

    constructor(table: Table) {
        this.#data = new DataQuery(table);
        this.#list = new ListQuery(table);
        this.#counter = new CounterQuery(table);
    }

    async data(fields: DataQueryFields, attributes: ListAttributes): Promise<RecordStoreStructure> {
        return this.#data.exec(fields, attributes);
    }

    async list(filter: FilterSpecs, attributes: ListAttributes): Promise<(string | number)[]> {
        return this.#list.exec(filter, attributes);
    }

    async counter(filter: FilterSpecs, attributes: CounterAttributes): Promise<number> {
        return this.#counter.exec(filter, attributes);
    }
}
