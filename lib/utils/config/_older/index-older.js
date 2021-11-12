const Property = function (root, specs, nested) {
    'use strict';

    const chokidar = require('chokidar');

    let path;
    Object.defineProperty(this, 'root', {'get': () => root});
    Object.defineProperty(this, 'path', {'get': () => path});
    Object.defineProperty(this, 'nested', {'get': () => nested});

    const properties = new (require('./properties'))(this, specs);

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

    const done = async function (data, now) {
    }

    /**
     * Loads the configuration file
     *
     * @param now= {number} The last request being processed
     * @returns {Promise<undefined>}
     */
    const load = async function (now) {
    }


    this.destroy = async function () {
        await properties.destroy();
    }
}

module.exports = Property;
