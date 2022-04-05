const {EventEmitter} = require('events');
const {fs} = global.utils;

module.exports = class extends EventEmitter {
    #backend;

    constructor(backend) {
        super();
        this.#backend = backend;
    }

    async build() {
        await this.#backend.ready;
        this.emit('message', `Building backend "${this.#backend.id}"`);

        const paths = {};
        const p = require('path');
        paths.base = p.join(process.cwd(), '.beyond/builds/server');
        paths.build = p.join(paths.base, 'code');
        paths.archive = p.join(paths.base, 'build.zip');

        if (await fs.exists(paths.build)) {
            this.emit('message', `A previous build of the backend was found on "${paths.build}"`);
            this.emit('message', 'Removing all content from the previous build of the backend');
            await fs.promises.rmdir(paths.build, {recursive: true});
            this.emit('message', 'Previous build removed');
        }
        else {
            this.emit('message', `Backend build is being processed on "${paths.build}"`);
        }

        await this.#backend.ready;
        await require('./core')(this.#backend, paths.build, this);
        await require('./sessions')(this.#backend, paths.build, this);
        await require('./modules')(this.#backend, paths.build, this);
    }
}
