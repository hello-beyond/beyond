const instances = new Map;
require('./ipc')(instances);
const fs = require('fs');

/**
 * socket.io listener in local and server environments
 */
module.exports = class {
    #config;
    #path;
    get path() {
        return this.#path;
    }

    #containers;
    get containers() {
        return this.#containers;
    }

    /**
     * Server constructor
     *
     * @param path {string} The directory where the instance is running.
     * @param dashboard {boolean} Is it the instance of the Beyond JS dashboard
     * take available ports and get the id of the path where the applications and libraries are located
     */
    constructor(path, dashboard) {
        if (!path) throw new Error('Invalid path parameter, path directory must be specified');
        if (!fs.existsSync(path) && !fs.statSync(path).isDirectory())
            throw new Error('Path does not exists or is not a directory');

        this.#path = path;
        instances.set(dashboard ? 'dashboard' : 'main', this);

        this.#config = new global.utils.Config(path, {
            '/applications': 'array',
            '/applications/children/node': 'object',
            '/applications/children/ssr': 'object',
            '/applications/children/backend': 'object',
            '/applications/children/legacyBackend': 'object',
            '/libraries': 'array',
            '/libraries/children/node': 'object',
            '/libraries/children/backend': 'object',
            '/libraries/children/legacyBackend': 'object'
        });
        this.#config.process('beyond.json').catch(exc => console.error(exc.stack));

        this.#containers = new (require('./containers'))(this.#config, dashboard);
    }
}
