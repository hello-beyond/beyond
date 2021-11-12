let autoincrement = 0;
const fs = require('../../fs');
const {EventEmitter} = require('events');
const equal = (require('../../equal'));
const chokidar = require('chokidar');

/**
 * Configuration property, abstract class from which classes './array' and './object' inherit
 */
module.exports = class extends EventEmitter {
    get dp() {
        return 'utils.config.property';
    }

    #parent;
    get parent() {
        return this.#parent;
    }

    #branchesSpecs;
    get branchesSpecs() {
        return this.#branchesSpecs;
    }

    #id = autoincrement++;
    get id() {
        return this.#id;
    }

    #file;
    #path;
    get path() {
        return this.#path;
    }

    // Can be 'array' or 'object'
    #type;
    get type() {
        return this.#type;
    }

    // The original configured data
    // (can be the string that points to the configuration file, an object, or an array of configurations)
    #data;

    #errors;
    get errors() {
        return this.#errors ? this.#errors : [];
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    get valid() {
        return this.#errors ? !this.#errors.length : true;
    }

    #value;
    get value() {
        return this.#value;
    }

    #branch;
    get branch() {
        return this.#branch;
    }

    #watcher;

    #destroyed = false;
    get destroyed() {
        return this.#destroyed;
    }

    #initialisationTimer;
    // Give the property some time to process.
    // If this time expires, notify the consumer as an error that it has not been initialized.
    // This would occur when the .process method is not executed.
    // If it is a root property, the method is executed by the consumer of the property directly,
    // and if it is a child property, the process method is executed by its parent,
    // in which case the consumer of the root needs to call the .process method.
    async initialise() {
        if (this.#initialised || this.#initialising) return;
        this.#initialising = true;

        this.#initialisationTimer = this.#initialisationTimer || setTimeout(() =>
            this.#ready.reject(new Error('Property has not been initialised')), 5000);

        await this.#ready.value;
        this.#initialising = false;
    }

    #initialising = false;
    get initialising() {
        return this.#initialising;
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    #processed = false;
    get processed() {
        return this.#processed;
    }

    #processing = false;
    get processing() {
        return this.#processing;
    }

    // The ready promise;
    #ready = Promise.pending();
    get ready() {
        return this.#ready ? this.#ready.value : Promise.resolve();
    }

    /**
     * Configuration property constructor
     *
     * @param path {string=} The path where the configuration file is located.
     * (only if the property is the root, otherwise it should be undefined).
     * Once the initial path is configured in the root property, the child nodes that have their
     * configuration in files, calculates its path with respect to its location.
     * @param branchesSpecs {object=} The list of properties that can be stored in independents files.
     * The key is the branch, and the value can be 'array' or 'object'
     * (only if the property is the root, otherwise it should be undefined)
     * @param branch {string=} The branch of the current property.
     * Ex: '/applications/children/template'
     * (if the property is the root, then an empty string ('') can be specified, or undefined)
     * @param parent {object=} The parent property.
     * (only if the property is a branch, otherwise it should be undefined)
     */
    constructor(path, branchesSpecs, branch, parent) {
        branch = branch ? branch : '';
        if (typeof branch !== 'string') throw new Error('Invalid "branch" parameter');
        if ((path && parent) || (!path && !parent)) throw new Error('Invalid parameters');
        super();

        this.#path = path;
        this.#branchesSpecs = parent ?
            parent.branchesSpecs :
            new (require('./branches-specs'))(branchesSpecs);

        this.#branch = branch;
        this.#parent = parent;

        if (!this.#branchesSpecs.has(branch)) throw new Error(`Branch "${branch}" not found`);
        this.#type = this.#branchesSpecs.get(branch);
    }

    #request;

    /**
     * Check if the value of the current property has changed.
     * To find it out, it is required to remove the children from the received data,
     * since the children properties verify their own data.
     *
     * @param value {object | undefined} The value to be compared with the actual value
     * @param errors {string[]} The value to be compared with the actual value
     */
    #checkChanged = (value, errors) => {
        if (!this.#value && !value) return false;
        if ((!this.#value && value) || (this.#value && !value)) return true;

        if (!equal(this.#errors, errors)) return true;

        value = Object.assign({}, value);
        const actual = Object.assign({}, this.#value);

        [...this.#branchesSpecs.keys()].forEach(branch => {
            if (!branch.startsWith(`${this.#branch}/`)) return;
            const child = branch.substr(this.#branch.length + 1).split('/')[0];
            delete value[child];
            delete actual[child];
        });

        return !equal(actual, value);
    };

    #onFileChanged = () => {
        const request = this.#request = Date.now();

        this.#processing = true;
        this.#processed = false;
        this.#ready = this.#ready ? this.#ready : Promise.pending();

        let changed;
        this.#load(request)
            .then(loaded => {
                const {value, errors} = loaded ? loaded : {};
                if (this.#destroyed || request !== this.#request) return;

                changed = this.#checkChanged(value, errors);
                this.#value = value;
                this.#errors = errors;

                this.#processing = false;
                this.#processed = true;
                changed && this.emit('change');
                this.#ready.resolve();
                this.#ready = undefined;

                this.updateChildren(request).catch(exc => console.error(exc.stack));
            });
    };

    /**
     * Loads the configuration file (when the property is specified as a string)
     *
     * @param request {number} The request that executed this method
     * @returns {Promise<{value: Array}|{errors: []}|undefined>}
     */
    #load = async (request) => {
        if (this.#destroyed) throw new Error('Property is destroyed');
        if (typeof this.#data !== 'string') throw new Error('Property is not an external file');

        const errors = [];

        const exists = (await fs.exists(this.#file)) && (await fs.stat(this.#file)).isFile();
        if (this.#destroyed || request !== this.#request) return;
        if (!exists) {
            errors.push(`Configuration file "${this.#file}" not found`);
            return {errors: errors};
        }

        const content = await fs.readFile(this.#file, {'encoding': 'UTF8'});
        if (this.#destroyed || request !== this.#request) return;

        let value;
        try {
            value = JSON.parse(content);
        }
        catch (exc) {
            errors.push(`Configuration file "${this.#file}" cannot be parsed - ${exc.message}`);
            return {errors: errors};
        }

        if (typeof value !== 'object' ||
            (this.#type === 'object' && (value instanceof Array)) ||
            (this.#type === 'array' && !(value instanceof Array))) {

            errors.push(`Configuration file "${this.#file}" value is invalid`);
            return {errors: errors};
        }

        return {value: value};
    }

    /**
     * Responsible for processing the value of a property.
     * If the data parameter is an object, it sets its value as the value of the property,
     * if the data parameter is a string, it takes its value as a file and returns
     * its content as the property's value.
     *
     * @param data= {object | string} If it is a string, then loads the file with its name and
     * returns the content, otherwise the value must be an object, and this is the configuration value
     * @returns {Promise<*>}
     */
    process = async (data) => {
        if (!data && !this.#parent) {
            // It is the root property, it is required the name of the file to be processed
            throw new Error('The .process method must receive the parameter file');
        }

        if (this.#destroyed) throw new Error('Property is destroyed');
        if (this.#initialised && equal(this.#data, data)) return;
        const request = this.#request = Date.now();

        this.#data = data;
        this.#processed = false;
        this.#processing = true;
        this.#ready = this.#ready ? this.#ready : Promise.pending();

        // Destroy the previous file watcher if exists
        await this.#watcher?.close();
        if (this.#destroyed || request !== this.#request) return;

        let changed, value, errors = [];
        if (typeof data === 'object') {
            this.#path = this.#parent ? this.#parent.path : this.#path;
            changed = this.#checkChanged(data, errors);
            value = data;
        }
        else if (typeof data === 'string') {
            // The data specified in the property is a file
            const path = this.#parent ? this.#parent.path : this.#path;

            this.#file = require('path').join(path, data);
            this.#path = require('path').dirname(this.#file);

            // Watch for file changes
            this.#watcher = chokidar.watch(this.#file, {'ignoreInitial': true});
            this.#watcher.on('all', this.#onFileChanged);

            ({value, errors} = await this.#load(request));
            if (this.#destroyed || request !== this.#request) return;

            changed = this.#checkChanged(value, errors);
        }
        else if (data) {
            errors.push(`Configuration value is invalid, value type must be an object, ` +
                `a string or undefined, but it is "${typeof data}"`);
            value = undefined;
            changed = this.#checkChanged(value, errors);
        }
        else {
            changed = !!(this.#value || (this.#errors && this.#errors.length));
        }

        this.#errors = errors;
        this.#value = value;

        const first = !this.#initialised;
        this.#initialised = true;
        this.#initialising = false;
        this.#initialisationTimer && clearTimeout(this.#initialisationTimer);
        this.#initialisationTimer = undefined;

        this.#processing = false;
        this.#processed = true;
        !first && changed && this.emit('change');
        this.#ready.resolve();
        this.#ready = undefined;
        first && this.emit('initialised');

        this.updateChildren(request).catch(exc => console.error(exc.stack));
    }

    async updateChildren() {
        throw new Error('This method should be overridden by the object or the array property');
    }

    destroyChildren() {
        throw new Error('This method should be overridden by the object or the array property');
    }

    destroy() {
        if (this.#destroyed) throw new Error('Property is already destroyed');
        this.#destroyed = true;
        this.removeAllListeners();
        this.destroyChildren();

        this.#watcher?.close().catch(exc => console.error(exc.stack));
        this.#watcher?.removeAllListeners();
    }
}
