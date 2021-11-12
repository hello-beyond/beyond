const Service = require('./service');
const Deployment = require('./deployment');
module.exports = class Application extends require('../file-manager') {
    _id;
    _name;
    _title;
    _version = 1;
    _modules;
    _port;
    _languages;
    _template;
    _params;
    _description;
    _transpile;
    _libraries;
    _static;
    _host;
    _backend;
    _fileName = 'application.json';
    _layout;
    _deployment;
    modules; // path where the modules of the application will be created
    _templates = {
        empty: './applications/empty',
        react: './applications/react',
        basic: './applications/basic'
    };

    skeleton = [
        'version', 'title', 'name', 'description',
        'layout', 'template', 'languages',
        'modules', 'static', 'backend',
        'deployment'
    ];

    get id() {
        return this._id;
    }

    get path() {
        return this._path;
    }

    relativePath() {
        return `${this.id}/${this._fileName}`;
    }

    #backend;
    get backend() {
        return this.#backend;
    }

    #deployment;
    get deployment() {
        return this.#deployment;
    }

    /**
     * @returns {string|*}
     */
    get modulesPath() {
        if (!this._modules || this._modules.path === '.') return this.path;

        const modulePath = this._modules.hasOwnProperty('path') ? this._modules.path : this._modules;
        return this.joinPath(this.path, modulePath);
    }

    constructor(path, specs = undefined) {
        super(path);

        this.#backend = new Service(path, this);
        if (specs) {
            const folder = typeof specs === 'string' ? this._setId(specs) : this._setId(specs.name)
            if (!folder) {
                throw Error('The application instance requires a name');
            }
            this._path = require('path').join(path, folder);
        }
        else this._path = path;

        this._load();
        this._checkProperties(specs);

        this.#deployment = new Deployment(this.path, this._deployment, specs?.port);
    }

    _setId(name) {
        return this._id = name.replace(/ /g, '-').toLowerCase();
    }

    async create(type, specs) {
        const fs = global.utils.fs;
        if (!type) {
            throw new Error('The type of application was not specified');
        }
        if (!this._templates.hasOwnProperty(type)) {
            throw new Error(`Does not exist a ${type} template`).red;
        }
        if (await fs.exists(this.path)) {
            throw new Error(`The application is already exists in ${this.path}`);
        }

        const tplPath = await this.templatesPath();
        const current = require('path').resolve(tplPath, this._templates[type]);
        await fs.copy(current, this.path);
        await this._load();

        if (!this.#deployment) {
            this.#deployment = new Deployment(this.path, this._deployment, specs.port);
            this._deployment = this.#deployment.getProperties();
        }

        await this.save(specs);
    }

    save(values) {
        const json = {deployment: this.#deployment.getProperties()}
        super.save(Object.assign(values, json));
    }
}