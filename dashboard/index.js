const http = require('http');
const {ipc} = global.utils;

module.exports = class {
    #ports = {};
    #http;

    #initialise = async () => {
        const info = await ipc.exec('main', 'dashboard/info');
        this.#ports.ws = info.port;

        this.#http = http.createServer(require('./listener')({service: {port: this.#ports.ws}}));
        this.#http.listen(this.#ports.http, null,
            error => error && console.log(`Error running dashboard: ${error.message}`)
        );
    }

    constructor(port) {
        this.#ports.http = port;
        this.#initialise().catch(exc => console.log(exc.stack));
    }
}
