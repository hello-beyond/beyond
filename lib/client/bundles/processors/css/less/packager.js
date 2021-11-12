module.exports = class extends require('../base') {
    constructor(specs) {
        super('less', specs, require('./compile'), '.less');
    }
}
