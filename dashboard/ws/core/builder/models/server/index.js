/**
 * Represents the Beyond Server
 *
 * @type {module.FileManager|{}}
 */
module.exports = class BeyondServer extends require('../file-manager') {
    _monitor;
    _fileName = 'beyond.json';

    #applications;
    get applications() {
        return this.#applications;
    }

    _libraries = [];
    get libraries() {
        return this._libraries;
    }

    constructor(path) {
        super(path);
        this.validate();
        this._load(path, this._fileName);
        this.#applications = new (require('./applications'))(this.path, this.file.json.applications);
    }

    async save() {
        if (this.#applications.isFile) await this.#applications.save();

        const specs = {applications: this.#applications.value, libraries: this._libraries};
        return this.file.writeJSON(this.file.getPath(this._fileName), {...this.file.json, ...specs});
    }

    addApplication = app => {
        this.applications.add(app);
        if (!this.applications.isFile) {
            return this.save();
        }
        return this.applications.save();

    }

    addLibrary(library) {
        this._libraries.push(library);
    }
}
