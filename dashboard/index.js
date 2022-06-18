const http = require('http');
const {ipc} = global.utils;

module.exports = class {
    #ports = {};
    #http;

    #initialise = async () => {
        const specs = await ipc.exec('main', 'dashboard/specs');
        this.#ports.ws = specs.ports.http;

        this.#http = http.createServer(require('./listener')({backend: {port: this.#ports.ws}}));
        this.#http.listen(this.#ports.http, null,
            error => error && console.log(`Error running dashboard: ${error.message}`)
        );
    }

    constructor(ports) {
        this.#ports = ports;
        this.#initialise().catch(exc => console.log(exc.stack));
    }
}
