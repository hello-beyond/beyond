const {ipc} = global.utils;
const {EventEmitter} = require('events');

module.exports = class extends EventEmitter {
    #specs;
    #name; // The process name to be referenced by IPC
    get name() {
        return this.#name;
    }

    #process;
    get process() {
        return this.#process;
    }

    get pid() {
        return this.#process?.pid;
    }

    #status = 'stopped';
    get status() {
        return this.#status;
    }

    #exception;
    get exception() {
        return this.#exception;
    }

    #destroyed;
    get destroyed() {
        return this.#destroyed;
    }

    constructor(specs) {
        super();
        this.#specs = specs;

        const {id, dashboard} = specs.container;
        if (!id || typeof dashboard !== 'boolean') throw new Error('Invalid specification');

        // The id must support to include the instance name (required by ipc to have a unique name),
        // as beyond-local runs two processes (with the same service.id) at the same time
        // (one for the dashboard instance, and the other for the main instance)
        this.#name = `bee@${id}-${dashboard ? 'dashboard' : 'main'}`;
    }

    #change() {
        if (this.#specs.is === 'ssr') return;
        ipc.events.emit('data-notification', {
            type: 'record/field/update',
            table: 'bees',
            field: 'status',
            value: this.#status,
            id: `${this.#specs.container.is}/${this.#specs.container.id}`,
            time: Date.now()
        });
    }

    #initialise = () => {
        if (this.#status !== 'stopped') throw new Error('Process already started');
        this.#status = 'initialising';
        this.#exception = undefined;
        this.#change();

        const {fork} = require('child_process');
        const args = [JSON.stringify(this.#specs)];

        const argv = ['--enable-source-maps', '--trace-warnings', '--trace-uncaught'];
        argv.push('--inspect=3099');

        const options = {
            cwd: this.#specs.path,
            execArgv: argv
        };
        this.#process = fork(require('path').join(__dirname, 'process.js'), args, options);

        this.#process.on('message', message => {
            if (typeof message !== 'object') return;

            switch (message.type) {
                case 'exception':
                    console.log('exception received', message);
                    this.#exception = message.exception;
                    break;
                case 'stop':
                    this.stop();
                    break;
                case 'initialised':
                    this.#status = 'running';
                    this.#change();
                    break;
            }
        });

        ipc.register(this.#name, this.#process);

        this.#process.on('exit', code => {
            const {name, dashboard, is} = this.#specs;
            dashboard && console.log(`Process of ${is} "${name}" exited event with code: ${code}`.red);

            this.#status = 'stopped';
            this.#change();
            this.emit('stopped');
            ipc.unregister(this.#name);
        });

        this.#process.send({type: 'initialise', port: this.#specs.port})
    }

    start() {
        if (this.#destroyed) {
            console.error(`Process "${this.#specs.path}" is destroyed`);
            return;
        }

        if (this.#status === 'stopped') {
            this.#initialise();
            return {code: 0};
        }
        const message = `Process has not been started because process status is actually "${this.#status}"`;
        return {code: 1, message: message};
    }

    stop() {
        if (this.#destroyed) {
            console.error(`Process "${this.#specs.path}" is destroyed`);
            return;
        }

        if (!['running', 'initialising'].includes(this.#status)) {
            const message = `Process has not been stopped because process status is actually "${this.#status}"`;
            return {code: 1, message: message};
        }

        this.#status = 'stopping';
        this.#change();
        this.#process.send({type: 'close'});
        return {code: 0};
    }

    destroy() {
        if (this.#destroyed) throw new Error('Service already destroyed');
        this.stop();
        this.#destroyed = true;
    }
}
