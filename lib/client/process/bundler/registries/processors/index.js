module.exports = class extends require('../registry') {
    dp() {
        return 'processors-registry';
    }

    constructor(config) {
        super('processors', config);
    }
}
