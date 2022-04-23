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

    #ready;
    get ready() {
        return this.#ready?.value;
    }

    #initialise = async () => {
        const ready = this.#ready;

        // Load the beyond.json configuration
        const config = new (require('./config'))(process.cwd());
        await config.load();

        // Start the files watchers main process
        require('./watchers/main');

        // Start the helper to share data used both by client and server
        require('./data')(config.content.port);

        // Reserve the first two available ports to the Beyond Dashboard (main & dashboard)
        const reserved = await require('./reserve-ports')(config.content.port);

        const published = !fs.existsSync(require('path').join(__dirname, 'dashboard'));

        // Create the main and dashboard instances
        const instances = this.#instances;
        instances.dashboard = !published && new (require('./dashboard'));
        instances.main = new (require('./main'));

        // Load the dashboard
        this.#dashboard = new (require('../dashboard'))(4000);

        // Print the welcome message
        const title = 'Welcome to BeyondJS';
        console.log(
            '\n' + (title).bold + '\n' +
            (new Array(title.length + 1).join('_')).bold +
            '\n\n' +
            `Open the ${'BeyondJS dashboard'.bold} following the link` + (published ? '' : 's') + ':\n' +
            (published ? '' : `http://localhost:${reserved.main} [main]\n`) +
            'http://localhost:4000' + (published ? '' : '[compiled dashboard]') + '\n' +
            (published ? '' : `http://localhost:${reserved.dashboard} [dashboard]\n`));

        ready.resolve();
    };

    constructor() {
        require('./global');

        this.#ready = Promise.pending();
        this.#initialise().catch(exc => console.log(exc instanceof Error ? exc.stack : exc));
    }
}
