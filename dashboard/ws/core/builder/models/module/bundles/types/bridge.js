module.exports = class Bridge extends require('./bundle') {
    _identifier = 'bridge';

    constructor(module, specs = {}) {
        super(module, 'bridge', specs);
    }

}
