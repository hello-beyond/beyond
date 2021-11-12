import type {RecordsManager} from "../manager";
import type {RecordIdentifier} from "../data/record";

export class Reports {
    readonly #manager: RecordsManager;

    constructor(manager: RecordsManager) {
        this.#manager = manager;
    }

    update(pk: string | number) {
        const {table} = this.#manager;
        const pkName = table.indices.primary.fields[0];

        const identifier: RecordIdentifier = {};
        identifier[pkName] = pk;

        const session: string = undefined;
        const record = this.#manager.recordsDataFactory.get(identifier, session);
        record.landed && record.invalidate();
        this.#manager.recordsDataFactory.release(identifier, session);
    }
}
