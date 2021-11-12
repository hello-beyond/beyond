require('colors');
module.exports = class Module extends require('../file-manager') {
    _id;
    _name;
    _developer;
    _title;
    _description;
    _server;
    _fileName = 'module.json';
    _transpile;
    _specs;
    _static;
    _reserved = ['reserved', 'bundles'];
    _backend;

    skeleton = [
        'name', 'developer', 'title', 'description',
        'compilation', 'transpilation', 'static', 'backend'
    ];

    /**
     * Map of bundles in the module
     * @type {Map<any, any>}
     * @private
     */
    _bundles = new Map();
    _BUNDLES = [
        'widget', 'page', 'code', 'layout', 'txt', 'start', 'backend', 'txt-menu'
    ];
    _templates = {
        page: './modules/templates/page',
        server_page: './modules/templates/page',
        mobile_login: './modules/templates/code'
    }
    /**
     * the bundle of the module
     * @private
     */
    _bundle;
    /**
     * Contains the value of the file in case that it exists.
     * @private _originalContent
     */
    _originalContent;
    _folderName;

    _loaded;

    constructor(path, name) {
        super(path);
        this._bundlesObjects = require('./bundles.js');
        //the name cannot has spaces or special characters.
        name = name ? this._setId(name) : false;
        this._path = path;
        this._folderName = name;
        this._load();
    }

    /**
     * Load the content of the file
     *
     * This method is used in the constructor, checks if in the path
     * exists a file for the object instanced and get his content.
     * @private
     */
    async _load() {
        if (!this.validate()) return;

        const content = this.readJSON();
        this._checkProperties(content);
        this._originalContent = content;

        let bundleType;
        const promises = [];
        for (const bundle of this._BUNDLES) {
            if (!content.hasOwnProperty(bundle)) continue;
            bundleType = bundle;
            const specs = {...{bundle: bundle}, ...content[bundle]};
            promises.push(this._getBundle(bundle, specs));
        }

        const bundles = await Promise.all(promises);
        bundles.forEach(bundle => this._bundles.set(bundle.identifier, bundle));
        this._loaded = true;
    }

    /**
     * Return de object that represents the  bundle type to be created
     *
     * Each Bundle type has a unique object to manage its properties
     * by itself. The bundles objects are accessible by _bundlesObjects property.
     *
     * @param bundleName
     * @param specs
     * @returns {*}
     * @private
     */
    _getBundle(bundleName, specs) {
        if (this._bundles.has(bundleName)) return this._bundles.get(bundleName);
        if (!this._bundlesObjects.hasOwnProperty(bundleName)) {
            throw new Error(`The specified bundle ${bundleName} does not exists`);
        }
        return new this._bundlesObjects[bundleName](this, this.path, specs);
    }

    /**
     * that method uses the parent process method and additionally
     * checks if the specs has a bundle configuration.
     *
     * @param specs
     * @private
     */
    _process(specs) {
        this._checkProperties(specs);

        for (let bundle of this._BUNDLES) {
            if (specs.hasOwnProperty(bundle)) this._getBundle(bundle, specs[bundle]);
        }
    }

    _setId(name) {
        return this._id = name.replace(/ /g, '-').toLowerCase();
    }

    get id() {
        return this._id;
    }

    relativePath() {
        return `${this.id}/${this._fileName}`;
    }

    get path() {
        if (!this._folderName) return this._path;
        return this.joinPath(this._path, this._folderName);
    }

    /**
     * TODO: doc it.
     * @param specs
     * @returns {{}}
     */
    cleanSpecs(specs) {
        const props = {};
        for (const property in specs) {
            if (!this.hasOwnProperty(`_${property}`) || property === 'id') {
                props[`${property}`] = specs[property];
            }
        }
        return props;
    }

    get fullPath() {
        return {
            path: this._path,
            folder: this._folderName
        };
    }

    async buildServer(path) {
        const tpl = await this.templatesPath();
        await this._fs.mkdir(this.joinPath(path, 'server'));
        const content = await this._fs.readFile(this.joinPath(tpl, `server.txt`));
        this._write(this.joinPath(path, 'server', 'index.js'), content);
    }

    /**
     * Check the bundles of the module and creates the structure necessary.
     *
     * Calls the build method of the bundles
     * @param bundle The bundle object
     * @param specs Properties of  the module that could has properties for the bundle.
     * @param overwrite If is false, the bundle does not replace files that exists in the
     * module folder.
     *
     * @returns {Promise<*>}
     */
    async armBundle(bundle, specs, overwrite = true) {
        if (specs.styles) bundle.addProcessor('scss');
        if (specs.bundle === 'page' && specs.layoutId) bundle.layout = specs.layoutId;

        await bundle.build(this.path, overwrite);
        return bundle;
    }

    get properties() {
        const props = {};
        this.skeleton.forEach(property => {
            const key = `_${property}`;
            if (this[key]) props[property] = this[key];
        });
        return props;
    }

    _checkBundles(specs) {
        let bundles = [];
        if (specs.bundle && typeof specs.bundle === 'string') bundles.push(specs.bundle);

        if (specs.multilanguage) {
            this._bundles.set('txt', this._getBundle('txt', {...{create: true}, ...specs}));
        }

        const defaultProcessors = ['ts'];
        specs.processors = specs.processors ? specs.processors.concat(defaultProcessors) : defaultProcessors;

        for (let bundle of bundles) {
            if (this._bundles.has(bundle)) {
                bundle = this.bundle.update(specs);
                continue;
            }
            this._bundles.set(bundle, this._getBundle(bundle, specs))
        }
    }

    /**
     * Create a new bundle
     *
     * @returns {Promise<void>}
     */
    async create(specs = {}) {
        specs.hmr = true;

        this._checkProperties(specs);
        this._checkBundles(specs);

        if (!this._bundles.size) throw Error('The module type cannot be undefined')

        try {
            await this._fs.mkdir(this.path, {recursive: true});

            const promises = [];
            this._bundles.forEach(bundle =>
                promises.push(this.armBundle(bundle, specs, false))
            );

            const json = this.properties;
            Promise.all(promises).then(async responses => {
                if (specs.server) {
                    json.server = 'server';
                    await this.buildServer(this.path);
                }

                for (let bundle of responses) {
                    const {identifier} = bundle;
                    const name = identifier === 'page' || identifier === 'layout' ? 'widget' : identifier;
                    json[name] = bundle.getProperties();
                }

                await this._writeJSON(this._getFilePath(), json);
            });
            /**
             * .tsconfig file is used by IDEs to identify dependencies
             * @type {module.TsConfig}
             */
            const tsconfig = new this._bundlesObjects.tsconfig(this, this.path);
            await tsconfig.create();
        }
        catch (exc) {
            console.error(exc);
        }
    }

    /**
     * Clone a module from a existing template
     *
     * @param params
     * @returns {Promise<void>}
     */
    async clone(params) {
        const {template} = params
        const fs = global.utils.fs;
        if (!template) {
            throw new Error(`the template name is required`);
        }

        const tplPath = await this.templatesPath();
        this._checkProperties(params);
        this._checkBundles(params);

        if (!this._templates.hasOwnProperty(template)) {
            throw new Error(`Does not exists a template for template: ${template}`);
        }
        const json = {};
        const current = this.joinPath(tplPath, this._templates[template]);
        await fs.copy(current, this.path);
        await this._load();

        if (params.processors) {
            this._bundles.forEach((bundle, name) => {
                if (name !== 'txt') bundle.addProcessors(params.processors);
            });
        }
        const promises = [];
        this._bundles.forEach(bundle => promises.push(this.armBundle(bundle, params)));

        Promise.all(promises).then(async responses => {
            if (params.server) {
                json.server = 'server';
                await this.buildServer(this.path);
            }
            for (let bundle of responses) json[bundle.identifier] = bundle.getProperties();

            await this._writeJSON(this._getFilePath(), json);
        });
    }

    /**
     * Updates the module.json file
     *
     * @param params
     * @returns {Promise<void>}
     */
    async save(params) {
        await this._load();
        this._checkProperties(params);
        const data = this.getProperties();

        this._bundles.forEach((bundle, id) => {
            if (params.hasOwnProperty(id) || params.hasOwnProperty('bundles')) {
                const bundles = params.bundles ?? {};
                const bundleData = params.bundle ?? {};
                const specs = {...bundles, ...bundleData};
                bundle.setValues(specs);
            }

            const identifier = (bundle.type === 'page' || bundle.type === 'layout') ? 'widget' : bundle.type;
            data[identifier] = bundle.getProperties();
        });

        await this._writeJSON(this._getFilePath(), data);
    }

    async addBundle(params) {
        if (!params.bundle) {
            console.error('Parameter bundle is necessary');
            return;
        }
        if (!this._BUNDLES.includes(params.bundle)) {
            console.error(`bundle ${params.bundle} not valid`);
            return;
        }

        params.bundlePath = true;
        this._checkBundles(params);
        if (!this._bundles.has(params.bundle)) {
            return;
        }

        const bundle = this._bundles.get(params.bundle);

        const tplPath = await this.templatesPath();
        await bundle.buildFiles(this._path, tplPath);
        await this.armBundle(bundle, params, false);

        const specs = {};
        const identifier = (params.bundle === 'page' || params.bundle === 'layout') ? 'widget' : params.bundle;
        specs[identifier] = params;

        await this.save(specs);
    }
}