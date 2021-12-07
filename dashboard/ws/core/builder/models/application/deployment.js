const Distribution = require('./distribution');
module.exports = class Deployment extends require('../file-manager') {
    _distributions;

    skeleton = ["distributions"];

    #distributions = new Map();
    #path;
    #default = {
        name: 'web-development',
        platform: 'web',
        environment: 'development',
        port: 8080,
        default: true
    }

    get distributions() {
        return this.#distributions;
    }

    get structure() {
        return {
            distributions: Array.from(this.#distributions.values()).map(d => d.getProperties())
        }
    }

    constructor(path, specs) {
        super(path);
        this.#path = path;
        if (specs) this.set(specs);
        // this.#distributions.set(`${this.#default.platform}-${this.#default.port}`, new Distribution(path, this.#default));
    }

    getProperties() {
        const json = {distributions: []};
        this.#distributions.forEach(d => json.distributions.push(d.getProperties()))
        return json;
    }

    getDefault = (specs) => ({...this.#default, ...specs});

    addDistribution = distribution => {
        const key = `${distribution.platform}-${distribution.port}`;
        this.#distributions.set(key, new Distribution(this.path, distribution))
    }

    set(data) {
        if (data.distributions) {
            data.distributions.forEach(this.addDistribution);
            delete data.distributions;
        }
        Object.keys(data).forEach(property => this[property] = data[property]);
    }

}
