module.exports = class extends require('../base') {
    constructor(specs) {
        super('scss', specs, require('./compile'), '.scss');
    }
}
