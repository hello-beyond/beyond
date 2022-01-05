const Service = require('./service');
const Deployment = require('./deployment');
module.exports = class Project extends require('../file-manager') {
    _id;
    _version = 1;
    _port;
    _imprimir = true;
    /**
     * @deprecated
     * @type {string}
     * @private
     */
    _fileName = 'application.json';
    #basename = 'application.json';

    _templates = {
        empty: './applications/empty',
        react: './applications/react',
        web: './applications/web',
        node: './applications/node',
        backend: './applications/backend',
        library: './applications/library',
        express: './applications/express'
    };

    skeleton = [
        'version',
        'title', 'name', 'description',
        'layout', 'template', 'languages',
        {name: 'modules', type: 'object'},
        'static', 'scope', 'deployment',
        {name: 'backend', type: 'object'},
        {name: 'node', type: 'object'},
        {name: 'ssr', type: 'object'},
        {name: 'externals', type: 'object'},

    ];

    get id() {
        return this._id;
    }

    relativePath() {
        return `${this.id}/${this._fileName}`;
    }

    #modules;
    get modules() {
        return this.#modules.structure;
    }

    set modules(data) {
        this.#modules.set(data);
    }

    #languages;
    get languages() {
        return this.#languages.structure;
    }

    set languages(data) {
        this.#languages.set(data);
    }

    get modulesObject() {
        return this.#modules;
    }

    #deployment;
    get deployment() {
        return this.#deployment.structure;
    }

    set deployment(data) {
        this.#deployment.set(data);
    }

    /**
     * @returns {string|*}
     */
    get modulesPath() {
        return this.#modules.file.file;
    }

    get path() {
        return this.file?.file;
    }

    constructor(path, specs = undefined) {
        super(path, 'application.json');
        // this.#backend = new Service(path, this);

        this.#languages = new (require('./languages'))();
        this.#deployment = new Deployment(this.file.dirname);
        this.#modules = new (require('./modules'))(path, '');
        this._load();
        /**
         * support to validate if the project.json does not has a module entry property
         */
        if (!this.file.json?.module) {
            this.#modules.setDefault();
        }
        this._checkProperties(specs);

    }

    _setId(name) {
        return this._id = name.replace(/ /g, '-').toLowerCase();
    }

    async create(type, specs) {
        const fs = global.utils.fs;
        if (!type) {
            throw 'The type of application was not specified';
        }

        const folder = this._setId(specs.name)
        if (!folder) throw Error('The application instance requires a name');

        if (!this._templates.hasOwnProperty(type)) {
            /**
             * @TODO: @julio check with felix and box
             */
            throw `Does not exist a ${type} template`;
        }

        if (await fs.exists(this.file.dirname)) {
            throw `The application is already exists in ${this.path}`;
        }

        const tplPath = await this.templatesPath();
        const current = require('path').resolve(tplPath, this._templates[type]);

        await fs.copy(current, this.file.dirname);
        await this._load();

        this.#deployment.setDistribution(this.#deployment.getDefault({port: specs.port}));
        this.save(specs);
    }

    save(values = {}) {
        const json = {deployment: this.#deployment.getProperties()};
        super.save(Object.assign(values, json));
    }

    set(object) {

    }

    setDistribution = distribution => this.#deployment.setDistribution(distribution);
}
