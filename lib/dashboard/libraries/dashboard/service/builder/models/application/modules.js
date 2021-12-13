module.exports = class extends require('../file-manager') {

    skeleton = [
        'path',
        'externals'
    ];

    #externals;

    get structure() {
        const structure = {path: this.path};
        const externals = this.#externals.structure;
        if (externals) structure.externals = externals;

        return structure;
    }

    constructor() {
        super();
        this.#externals = new (require('./externals'))();
    }

    set(data) {
        console.log(1, data)
        if (data.externals) {
            console.log(2, data.externals);
            this.#externals.set(data.externals);
            delete data.externals;
        }
        this._checkProperties(data);

    }
}
