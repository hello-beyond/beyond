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
    }

    getProperties() {
        const json = {distributions: []};
        this.#distributions.forEach((d, k) => {
            json.distributions.push(d.getProperties())
        })
        return json;
    }

    getDefault = (specs) => ({...this.#default, ...specs});

    setDistribution = distribution => {
        if (!distribution.port || !distribution.platform) {
            return {error: 'INVALID_CONFIG', code: 1};
        }

        let compute = {...distribution};
        delete compute.port
        const newDistribution = new Distribution(this.path, distribution);
        const list = Array.from(this.#distributions.values());

        if (list.find(dist => dist.compute === newDistribution.compute)) {
            list.find(dist => dist.compute === newDistribution.compute);
            return {error: 'ALREADY_EXISTS'};
        }
        if (list.find(dist => dist.port === distribution.port)) {
            return {error: 'PORT_USED', code: 2}
        }
        const key = `${distribution.platform}-${distribution.port}`;
        this.#distributions.set(key, newDistribution)
        return true;
    }

    set(data) {

        if (data.distributions) {
            data.distributions.forEach(this.setDistribution);
            delete data.distributions;
        }
        Object.keys(data).forEach(property => this[property] = data[property]);
    }

}
