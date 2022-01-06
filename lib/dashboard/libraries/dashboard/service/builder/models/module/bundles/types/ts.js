module.exports = class Ts extends require('./bundle') {
    _identifier = 'ts';

    constructor(module, specs = {}) {
        super(module, 'ts', specs);
    }

}
