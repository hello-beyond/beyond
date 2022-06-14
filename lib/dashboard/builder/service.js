module.exports = class {
    #showMessage = message => console.log(`  - ${message.text}`);

    constructor() {
        // Instantiate the bees containers
        const path = require('path').join(__dirname, '..');
        new (require('../../server'))(path, true);
    }

    build = async () => {
        const {ipc} = global.utils;

        // Get the id of the application
        const path = require('path').join(__dirname, '../libraries/dashboard');
        const id = await ipc.exec('main', 'ids.path/generate', path);

        ipc.events.on('main', 'legacy-builder-notification', this.#showMessage);
        await ipc.exec('main', 'bees/build', `library/${id}/legacy`, 'dashboard');
        ipc.events.off('main', 'legacy-builder-notification', this.#showMessage);
    }
}
