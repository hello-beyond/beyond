/**
 * Represent the current dashboard user
 */
export class DSUser extends ReactiveModel {
    #name;
    get name() {
        return this.#name;
    }

    set name(value) {
        if (!value || value === this.#name) return;
        if (typeof value !== 'string') throw new Error('the name must be a string');
        this.#name = value;
        localStorage.setItem('ds.user.name', value);
    }

    #hasAccess;
    get hasAccess() {
        return this.#hasAccess;
    }

    #code;
    get code() {
        return this.#code;
    }

    #email;
    get email() {
        return this.#email;
    }

    #dashboard;

    #validated;
    get validated() {
        return this.#validated;
    }

    constructor(dashboard) {
        super();
        this.#dashboard = dashboard;
        this.#check();
    }

    #check() {
        this.#name = localStorage.getItem('ds.user.name');
        this.#code = localStorage.getItem('ds.user.code');
        this.#email = localStorage.getItem('ds.user.email');
        this.#validated = !!this.#name && this.#code;
    }

    async register(name, code) {
        const response = await this.validate(code);
        if (response) {
            this.#name = name;
            localStorage.setItem('ds.user.name', name);
            localStorage.setItem('ds.user.code', code);
        }
        return response;
    }

    async validate(code) {
        const response = await this.#dashboard.validate(code);
        this.#validated = true;
        this.#hasAccess = response;
        this.triggerEvent();
        return response;
    }
}



