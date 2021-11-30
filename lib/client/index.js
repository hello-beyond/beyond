const {fork} = require('child_process');

module.exports = class {
    /**
     *  The BeyondJS client
     *
     * @param root {string} The root folder of the instance
     * @param dashboard {boolean} Is it the instance of the Beyond JS dashboard
     */
    constructor(root, dashboard) {
        const forked = fork(
            require('path').join(__dirname, 'process', 'index.js'),
            [JSON.stringify({
                dirname: root,
                dashboard: dashboard
            })],
            {cwd: process.cwd()});

        Object.defineProperty(this, 'process', {get: () => forked});

        const {ipc} = global.utils;
        ipc.register(`${dashboard ? 'dashboard' : 'main'}-client`, forked);
    }
}