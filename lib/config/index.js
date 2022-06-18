const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'beyond.config';
    }

    #root;

    #ports;
    get ports() {
        return this.#ports;
    }

    #errors;
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    constructor(root) {
        super();
        this.#root = root;

        const config = new global.utils.Config(this.#root, {
            '/dashboard': 'object'
        });
        config.data = 'beyond.json';

        super.setup(new Map([['config', {child: config.properties.get('dashboard')}]]));
    }

    _process() {
        const config = this.children.get('config').child;
        if (!config.valid) {
            this.#errors = config.errors;
            return;
        }

        const value = config.value ? config.value : {};

        const ports = this.#ports = {compiled: {}, local: {}, self: {}};
        ports.compiled.http = value.http ? value.http : 4000;
        ports.compiled.ws = value.ws ? value.ws : 4001;

        ports.local.http = value.local?.http ? value.local.http : 3020;
        ports.local.ws = value.local?.ws ? value.local.ws : 3022;

        ports.self.http = value.self?.http ? value.self.http : 3021;
        ports.self.ws = value.self?.ws ? value.self.ws : 3023;

        ports.reserved = value.reserved ? value.reserved : 3030;
    }
}
