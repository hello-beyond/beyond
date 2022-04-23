import {Product} from "../../factory/product";
import {RecordData, RecordIdentifier} from "../data/record";
import {WrappedFactory} from "./factory";
import {WrappedRecordFields} from "./fields/fields";

export class WrappedRecord extends Product {
    readonly #identifier: RecordIdentifier;
    get identifier(): RecordIdentifier {
        return this.#identifier;
    }

    readonly #session: string;
    get session(): string {
        return this.#session;
    }

    #destroyed = false;
    get destroyed() {
        return this.#destroyed;
    }

    #record: RecordData;
    get record() {
        return this.#record;
    }

    get version(): number {
        return this.#record.version;
    }

    readonly #fields: WrappedRecordFields;
    get fields() {
        return this.#fields;
    }

    get loaded(): boolean {
        return this.#record.loaded;
    }

    get fetched(): boolean {
        return this.#record.fetched;
    }

    get fetching(): boolean {
        return this.#record.fetching;
    }

    get found(): boolean {
        return this.#record.found;
    }

    load = () => this.#record.load();
    fetch = () => this.#record.fetch();

    #triggerChange = () => this.trigger('change');
    #triggerUpdated = () => this.trigger('updated');
    #triggerInvalidated = () => this.trigger('invalidated');

    #bind = () => {
        this.#record.on('change', this.#triggerChange);
        this.#record.on('updated', this.#triggerUpdated);
        this.#record.on('invalidated', this.#triggerInvalidated);
    };

    #unbind = () => {
        if (!this.#record) return;
        this.#record.off('change', this.#triggerChange);
        this.#record.off('updated', this.#triggerUpdated);
        this.#record.off('invalidated', this.#triggerInvalidated);
    };

    #update = (record: RecordData) => {
        this.#unbind();
        this.#record = record;
        this.#bind();
        this.trigger('change');
    }

    constructor(manager: WrappedFactory,
                key: string, instanceId: number,
                identifier: RecordIdentifier, session: string) {
        super(manager, key, instanceId, session);

        this.#identifier = identifier;
        this.#session = session;

        const {recordsDataFactory} = manager;
        recordsDataFactory.on(`identifier.${key}.record.changed`, this.#update);

        const record = recordsDataFactory.get(identifier, session);
        this.#update(record);

        this.#fields = new WrappedRecordFields(this);
    }

    destroy() {
        if (this.#destroyed) {
            throw new Error('FactorizedRecord already destroyed');
        }

        this.#destroyed = true;
        const {recordsDataFactory} = <WrappedFactory>this.manager;
        recordsDataFactory.off('change', this.#update);
        super.destroy();

        this.#record.manager.release(this.#identifier, this.#session);
    }
}
