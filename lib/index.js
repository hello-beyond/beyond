require('colors');
process.title = 'BeyondJS Main Process';
const fs = require('fs');

module.exports = new class {
    #instances = {};

    get main() {
        return this.#instances.main;
    }

    get dashboard() {
        return this.#instances.dashboard;
    }

    // The compiled dashboard
    #dashboard;

    #initialise = async () => {
        const {ipc} = global.utils;

        // Load the beyond.json configuration
        const config = new (require('./config'))(process.cwd());
        await config.ready;
        const {ports} = config;

        // Start the files watchers main process
        require('./watchers/main');

        // Start the helper to share data used both by client and server
        require('./data')(config.ports.reserved);

        const errors = [];
        const published = !fs.existsSync(require('path').join(__dirname, 'dashboard'));

        // Check if the dashboard ports are available
        await (async () => {
            if (published) return;

            const error = port => {
                errors.push(`Required port "${port}" is not available`);
            }

            let reserved;
            reserved = await ipc.exec('main', 'ports.reserve', 'dashboard/main', false, ports.local.http);
            reserved !== ports.local.http && error(ports.local.http);

            reserved = await ipc.exec('main', 'ports.reserve', 'dashboard/dashboard', true, ports.self.http);
            reserved !== ports.self.http && error(ports.self.http);

            reserved = await ipc.exec('main', 'ports.reserve', 'dashboard/compiled', true, ports.compiled.http);
            reserved !== ports.compiled.http && error(ports.compiled.http);

            reserved = await ipc.exec('main', 'ports.reserve', 'dashboard/compiled/ws', true, ports.compiled.ws);
            reserved !== ports.compiled.ws && error(ports.compiled.ws);
        })();

        if (errors.length) {
            const title = 'Some errors were found:';
            console.log(
                '\n' + (title).red.bold + '\n' +
                (new Array(title.length + 1).join('_')).red
            );
            errors.forEach(error => console.log(`* ${error}`));
            return;
        }

        // Create the main and dashboard instances
        const instances = this.#instances;
        instances.dashboard = !published && new (require('./dashboard'));
        instances.main = new (require('./main'));

        // Start the compiled dashboard
        this.#dashboard = new (require('../dashboard'))(ports.compiled);

        // Print the welcome message
        const title = 'Welcome to BeyondJS';
        console.log(
            '\n' + (title).bold + '\n' +
            (new Array(title.length + 1).join('_')).bold +
            '\n\n' +
            `Open the ${'BeyondJS dashboard'.bold} following the link` + (published ? '' : 's') + ':\n' +
            (published ? '' : `http://localhost:${ports.local.http} [main]\n`) +
            `http://localhost:${ports.compiled.http}` + (published ? '' : ' [compiled dashboard]') + '\n' +
            (published ? '' : `http://localhost:${ports.self.http} [dashboard]\n`));
    };

    constructor() {
        require('./global');
        this.#initialise().catch(exc => console.log(exc instanceof Error ? exc.stack : exc));
    }
}
