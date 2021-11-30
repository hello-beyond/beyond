/**
 * Represents the Beyond Server
 *
 * @type {module.FileManager|{}}
 */
module.exports = class BeyondServer extends require('./file-manager') {
    _monitor;
    _fileName = 'beyond.json';

    /**
     * represents the applications.json if exists
     * @private
     */
    _appsJson;

    _applications = [];
    get applications() {
        return this._applications;
    }

    _libraries = [];
    get libraries() {
        return this._libraries;
    }

    constructor(path) {
        super(path);
        this.validate();
        this._load(path, this._fileName);
        this._checkProperties();
    }

    save() {
        const specs = {applications: this._applications, libraries: this._libraries};
        this._writeJSON(this._getFilePath(), {...this.getContent(true), ...specs});
    }

    addApplication = app => {
        if (this._applications instanceof Array) {
            this._applications.push(app);
            return;
        }

        const {FileManager} = (require('./index'));
        const path = require('path').resolve(this._path, `./${this._applications}`);
        this._appsJson = new FileManager(path);
        this._appsJson._load();
        const content = this._appsJson.getContent(true);
        content.push(app);
        this._writeJSON(this._appsJson._getFilePath(), content);
    }

    addLibrary(library) {
        this._libraries.push(library);
    }
}
