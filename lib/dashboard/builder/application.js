const {ipc} = global.utils;

module.exports = class {
    #path;

    #showMessage = message => {
        let {text} = message;
        text = message.error ? (text).red : text;
        console.log(`  - ${text}`);
    }

    constructor() {
        // Instantiate the client
        this.#path = require('path').join(__dirname, '..');
        new (require('../../client'))(this.#path, true);
    }

    build = async () => {
        ipc.events.on('dashboard-client', 'builder-notification', this.#showMessage);

        const distribution = {
            key: 'dashboard',
            name: 'dashboard',
            platform: 'web',
            environment: 'production',
            bundles: {mode: 'amd'}
        };

        // Get the id of the application
        const path = require('path').join(this.#path, 'application');
        await ipc.exec('dashboard-client', 'applications/build', path, distribution);

        ipc.events.off('dashboard-client', 'builder-notification', this.#showMessage);
    }
}
