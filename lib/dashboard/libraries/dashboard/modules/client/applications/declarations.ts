import {beyond} from "@beyond-js/kernel/core/ts";
import {module} from "beyond_context";
import type {Application} from "./item";
import {ReactiveModel} from "../reactive-model";

interface DeclarationMessage {
    id: string,
    count: number,
    total: number,
}

export /*bundle*/
class ApplicationDeclarations extends ReactiveModel {
    readonly #application: Application;

    #error: string;
    get error() {
        return this.#error;
    }

    #currentDeclaration: string;
    get currentDeclaration(): string {
        return this.#currentDeclaration;
    }

    #total: number;
    get total(): number {
        return this.#total;
    }

    #count: number;
    get count(): number {
        return this.#count;
    }

    clean() {
        this.#total = 0;
        this.#count = 0;
        this.#error = '';
        this.#currentDeclaration = '';
        this.processed = false;
        this.triggerEvent();
    }

    onDeclarationSave(message: DeclarationMessage) {
        void this;

        this.#error = '';
        this.#total = message.total;
        this.#count = message.count;
        this.#currentDeclaration = message.id;
        this.processed = this.count === this.total;
        this.processing = this.count !== this.total;

        //when the process finished current declaration is clean
        this.processed && (this.#currentDeclaration = '');
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
                console.error('Error Creating module: ', response.error);
            }

        } catch (error) {
            this.#error = error;
        } finally {
            this.triggerEvent();
        }
    }
}