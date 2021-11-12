const Distribution = require('./distribution');
module.exports = class Deployment extends require('../file-manager') {
    _distributions;

    skeleton = ["distributions"];

    #distributions = new Map();
    get distributions() {
        return this.#distributions;
    }

    constructor(path, specs, port) {
        super(path);

        if (specs?.distributions) {
            specs.distributions.forEach(dist =>
                this.#distributions.set(`${dist.platform}-${dist.port}`, new Distribution(path, dist))
            );
            return;
        }

        const dist = this.defaultDistribution(port);
        this.#distributions.set(`${dist.platform}-${dist.port}`, new Distribution(path, dist));
    }

    getProperties() {
        const json = {distributions: []};
        this.#distributions.forEach(d => json.distributions.push(d.getProperties()))
        return json;
    }

    defaultDistribution(port = 8080) {
        return {
            name: 'web-development',
            platform: 'web',
            environment: 'development',
            port: port,
            default: true
        }
    }

    addDistribution(distributions) {
        distributions.forEach(dist =>
            this.#distributions.set(`${dist.platform}-${dist.port}`, new Distribution(this.path, dist))
        );
    }
}