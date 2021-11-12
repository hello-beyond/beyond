let counter = 0;

/**
 * Configuration processor where the values of the properties can be an object or a nested file
 *
 * @param root {string} The root directory where the configuration is located
 * @param specs {object} The list of properties that can be stored
 * in independents files. The key is the path to the configuration, and the value can be 'array' or 'object'
 * @param nested {string} The path of nested properties. Ex: /applications/template
 */
const Property = function (root, specs, nested) {
    'use strict';

    const fs = (require('../fs'));
    const chokidar = require('chokidar');

    nested = nested ? nested : '';

    const id = ++counter;
    Object.defineProperty(this, 'id', {'get': () => id});

    let path;
    if (!root) throw new Error('Invalid parameters, root must be specified');
    Object.defineProperty(this, 'root', {'get': () => root});
    Object.defineProperty(this, 'path', {'get': () => path});
    Object.defineProperty(this, 'nested', {'get': () => nested});

    const Specs = require('./specs.js');
    specs = specs instanceof Specs ? specs : new Specs(specs);

    const properties = new (require('./properties'))(this, specs);
    const events = new (require('events').EventEmitter);
    this.on = function (event) {
        if (event !== 'change') throw new Error('Invalid parameters');
        events.on.call(events, ...arguments);
    };
    this.removeListener = (event, listener) => events.removeListener(event, listener);

    let watcher; // The file watcher

    let unprocessed, // The value that was set before processed
        value, errors = [], warnings = [], destroyed;
    Object.defineProperty(this, 'unprocessed', {'get': () => unprocessed});
    Object.defineProperty(this, 'value', {'get': () => value});
    Object.defineProperty(this, 'errors', {'get': () => errors});
    Object.defineProperty(this, 'warnings', {'get': () => warnings});
    Object.defineProperty(this, 'valid', {'get': () => !errors.length});
    Object.defineProperty(this, 'destroyed', {'get': () => !!destroyed});

    let request;

    /**
     * Executed once the property's data is processed
     *
     * @param data {object | array} The property's data
     * @param now {number} The request being processed
     * @returns {Promise<void>}
     */
    const done = async function (data, now) {
        if (errors.length) {
            value = undefined;
            events.emit('change');
            return;
        }

        const processed = await properties.update(data, value);
        if (destroyed || now !== request) return;

        processed.errors.length ? errors = errors.concat(processed.errors) : value = processed.updated;
        events.emit('change');
    }

    /**
     * Loads the configuration file
     *
     * @param now= {number} The last request being processed
     * @returns {Promise<undefined>}
     */
    const load = async function (now) {
        if (destroyed) throw new Error('Property is destroyed');

        now = now ? now : request = Date.now();

        errors = [];

        // At this point, the value specified in the property is a file, so read the content
        // parse it and watch for changes

        const file = require('path').resolve(root, unprocessed);
        path = require('path').dirname(file);

        watcher ? await watcher.close() : null;
        if (destroyed || now !== request) return;
        watcher = chokidar.watch(file, {'ignoreInitial': true});
        watcher.on('all', () => load());

        const exists = (await fs.exists(file)) && (await fs.stat(file)).isFile();
        if (destroyed || now !== request) return;
        if (!exists) {
            errors.push(`Configuration file "${file}" not found`);
            return done(undefined, now);
        }

        const content = await fs.readFile(file, {'encoding': 'UTF8'});
        if (destroyed || now !== request) return;

        let data;
        try {
            data = JSON.parse(content);
        }
        catch (exc) {
            errors.push(`Configuration file "${file}" is invalid - ${exc.message}`);
            return done(undefined, now);
        }

        if (typeof data !== 'object') {
            errors.push(`Configuration file "${file}" is invalid`);
            return done(undefined, now);
        }

        return done(data, now);
    }

    /**
     * Responsible for processing the value of a property.
     * If the data parameter is an object, it sets its value as the value of the property,
     * if instead, the data parameter is a string, it takes its value as a file and returns
     * its content as the property's value.
     *
     * @param data= {object | string} If it is a string, then loads the file with its name and
     * returns the content, otherwise the value must be an object, and this is the configuration value
     */
    const process = async function (data) {
        if (destroyed) throw new Error('Property is destroyed');

        const now = request = Date.now();

        errors = [];

        const equal = (require('../equal'));
        if (equal(unprocessed, data)) return;

        watcher ? await watcher.close() : null;
        if (destroyed || now !== request) return;

        if (!['undefined', 'object', 'string'].includes(typeof data)) {
            errors.push(`Configuration value is invalid, value type must be an object, ` +
                `a string or undefined, but it is "${typeof data}"`);
            return done(undefined, now);
        }

        unprocessed = data;

        path = typeof data !== 'string' ? root : path;

        if (!data) return done(undefined, now);
        if (typeof data === 'object') return done(data, now);
        await load(now);
    }

    this.process = data => process(data);

    this.destroy = async function () {
        if (destroyed) throw new Error('Property is already destroyed');
        destroyed = true;

        events.removeAllListeners();
        watcher ? await watcher.close() : null;
        await properties.destroy();
    }
}

module.exports = Property;
