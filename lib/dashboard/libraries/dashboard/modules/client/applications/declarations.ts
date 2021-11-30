import {module} from "beyond_context";
import {Events} from "@beyond-js/kernel/core/ts";
import type {Application} from "./item";

export /*bundle*/
class ApplicationDeclarations extends Events {
    readonly #parent: Application;

    #error: string;
    get error() {
        return this.#error;
    }

    get value() {
        return this.#parent.fields.get('declarations')?.value;
    }

    get updating() {
        return this.#parent.fields.get('declarations')?.value?.updating;
    }

    constructor(parent: Application) {
        super();
        this.#parent = parent;
    }

    async update() {
        try {
            if (!this.#parent.id) {
                console.warn('the application id is not defined');
                return;
            }

            const action = '/applications/declarations/update';
            const response: any = await module.execute(action, {applicationId: this.#parent.id});

            if (response?.error) {
                this.#error = response.error;
                console.error('Error Creating module: ', response.error);
                return;
            }
        } catch (error) {
            this.#error = error;
        } finally {
            this.trigger('change');
        }
    }
}