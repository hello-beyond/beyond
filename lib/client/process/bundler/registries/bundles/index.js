module.exports = class extends require('../registry') {
    dp() {
        return 'bundles-registry';
    }

    get transversals() {
        return new Map([...this].filter(([name, bundle]) => bundle.Transversal && [name, bundle]));
    }

    constructor(config) {
        super('bundles', config);
    }
}
