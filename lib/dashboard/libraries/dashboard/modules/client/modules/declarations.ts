import {module} from "beyond_context";
import {Events} from "@beyond-js/kernel/core/ts";
import {ItemsProperty} from "@beyond-js/plm/core/ts";
import type {Module} from "./item";
import type {Bundle} from "../bundles/item";

export /*bundle*/
class ModuleDeclarations extends Events {
    readonly #parent: Module;

    #errors: string;
    get errors() {
        return this.#errors;
    }

    #fetching: boolean;
    get fetching() {
        return this.#fetching;
    }

    constructor(parent: Module) {
        super();
        this.#parent = parent;
    }

    has(type: string) {
        let find = false;
        const bundles = <ItemsProperty>this.#parent.properties.get('bundles');
        bundles.forEach((bundle: Bundle) => {
            if (type === bundle.fields.get('name').value) {
                find = true;
            }
        });

        return find;
    }

    async update() {

        if (!this.has('ts')) {
            console.warn('the module does not use declarations');
            return;
        }

        try {
            const action = '/modules/declarations/update';
            const id = {id: this.#parent.fields.get('id').value};

            const response: any = await module.execute(action, id);

            if (response?.error) {
                this.#errors = response.error;
                console.error('Error Creating module: ', response.error);
                return;
            }
        } catch (error) {
            this.#errors = error;
        } finally {
            this.#fetching = false;
            this.trigger('change');
        }

    }
}