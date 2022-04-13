import {beyond} from "@beyond-js/kernel/core/ts";
import {module} from "beyond_context";
import type {Application} from "./item";
import {ReactiveModel} from "../reactive-model";

interface DeclarationMessage {
    total: number,
    item?: { id: string, valid: boolean }
}

export /*bundle*/
class ApplicationDeclarations extends ReactiveModel {
    readonly #application: Application;

    #error: string;
    get error() {
        return this.#error;
    }

    #total = 0;
    get total() {
        return this.#total;
    }

    #itemsProcessed = 0;
    get itemsProcessed() {
        return this.#itemsProcessed;
    }

    #onProcess: string;
    get onProcess(): string {
        return this.#onProcess;
    }

    #success = new Set();
    get success() {
        return this.#success;
    }

    #errors = new Set();
    get errors() {
        return this.#errors;
    }

    clean() {
        this.#total = 0;
        this.#error = '';
        this.#onProcess = '';
        this.#itemsProcessed = 0;
        this.#errors.clear();
        this.#success.clear();
        this.processed = false;
        this.processing = false;

        this.triggerEvent();
    }

    onDeclarationSave(message: DeclarationMessage) {
        void this;

        const {item, total} = message;
        this.#total = total;

        if (!item) {
            this.triggerEvent();
            return;
        }

        this.#onProcess = item.id;
        item.valid ? this.#success.add(item.id) : this.#errors.add(item.id);

        this.#itemsProcessed = this.#success.size + this.#errors.size;
        this.processed = this.#itemsProcessed === this.#total;
        this.processing = this.#itemsProcessed !== this.#total;

        //when the process finished the declaration in process is cleaned
        this.processed && (this.#onProcess = '');
        this.triggerEvent();
    }

    async initialise() {
        const socket = await beyond.libraries.get('@beyond-js/dashboard-lib').getSocket();
        socket.on(`declaration-save:${this.#application.id}`, this.onDeclarationSave);
    }

    constructor(application: Application) {
        super();
        this.#application = application;
        this.initialise().catch(exc => console.error(exc.stack));
        this.clean = this.clean.bind(this);
        this.onDeclarationSave = this.onDeclarationSave.bind(this);
    }

    async update(id: string | boolean = false) {
        try {
            if (!this.#application.id) {
                console.warn('the application id is not defined');
                return;
            }

            this.clean();
            this.processing = true;
            const action = id ? '/applications/declarations/update' : '/applications/declarations/updateAll';
            const specs = {id: id, applicationId: this.#application.id};

            const response: any = await module.execute(action, specs);

            if (response?.error) {
                this.#error = response.error;
                console.error(response.error);
            }

        } catch (exc) {
            this.#error = exc;
        } finally {
            this.triggerEvent();
        }
    }
}