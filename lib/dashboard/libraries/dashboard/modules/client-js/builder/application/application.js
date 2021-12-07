export class ApplicationBuilder extends ReactiveModel {

    #id;
    get id() {
        return this.#id;
    }

    set id(value) {
        if (value === this.#id || typeof value !== 'string') return;
        this.triggerEvent();
    }

    #title;
    get title() {
        return this.#title;
    }

    set title(value) {
        if (value === this.#title || typeof value !== 'string') return;
        this.#title = value;
        this.triggerEvent();
    }

    get version() {
        return 1;
    }

    #description;
    get description() {
        return this.#description;
    }

    set description(value) {
        if (value === this.#description || typeof value !== 'string') return;
        this.#description = value;
        this.triggerEvent();
    }

    #created;
    get created() {
        return this.#created;
    }

    set created(value) {

        if (value === this.#created || typeof value !== 'boolean') return;
        this.#created = value;
        this.triggerEvent();
    }

    #identifier;
    get identifier() {
        return this.#identifier;
    }

    set identifier(value) {
        if (value === this.#identifier || typeof value !== 'string') return;
        this.#identifier = value;
        this.triggerEvent();
    }

    #type;
    get type() {
        return this.#type;
    }

    set type(value) {
        if (value === this.#type || typeof value !== 'string') return;
        this.#type = value;
        this.triggerEvent();
    }

    #validPort;
    get validPort() {
        return this.#validPort;
    }

    set validPort(value) {
        if (value === this.#validPort) return;
        this.#validPort = !!value;
        this.triggerEvent();
    }

    #port = 4080;
    get port() {
        return this.#port;
    }

    set port(value) {
        if (value === this.#port || value !== '' && isNaN(parseInt(value))) return;
        this.#port = value === '' ? value : parseInt(value);
        this.triggerEvent();
    }

    #ready;
    get ready() {
        return this.#ready;
    }

    get getters() {
        return {
            id: this.id,
            port: this.port,
            type: this.type,
            name: this.name,
            title: this.title,
            version: this.version,
            modules: this.modules,
            created: this.created,
            processed: this.processed,
            processing: this.processing,
            description: this.description
        }
    }

    set(specs) {

    }

    constructor() {
        super();
        this.create = () => create(this);
        this.checkPort = (port) => checkPort(this, port)
        this.getInitialPort();
    }

    async getInitialPort() {
        let cont = 0;
        let port = 8080;
        while (cont < 5 || !this.#port) {
            await this.checkPort(port);
            if (this.#port && this.#validPort) {
                this.#ready = true;
                this.triggerEvent();
                return;
            }
            port = port - 100;
            this.#ready = true;
            cont++;
        }

    }

}

