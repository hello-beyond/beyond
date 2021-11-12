const {fs} = global.utils;

module.exports = function (application) {
    'use strict';

    let file;
    Object.defineProperty(this, 'file', {'get': () => file});

    let initialised = false;
    const initialise = async () => {
        if (initialised) return;
        initialised = true;

        await application.ready;
        file = require('path').join(process.cwd(), '.beyond/builds/client/builds.json');
    };

    this.read = async function () {
        await initialise();

        let builds = {};
        if (!(await fs.exists(file))) return builds;

        try {
            const content = await fs.readFile(file);
            builds = JSON.parse(content);
        }
        catch (exc) {
            console.error(`Error reading or parsing builds information file "${file}"`);
        }
        return builds;
    }

    this.append = async function (paths, distribution, finalised) {
        await initialise();

        const data = await this.read();
        data[distribution.name] = {
            'platform': distribution.platform,
            'environment': distribution.environment,
            'compress': distribution.compress,
            'base': paths.base,
            'archive': paths.archive,
            'finalised': !!finalised,
            'time': Date.now()
        };

        await fs.save(file, require('json-format')(data, {
            type: 'space',
            size: 2
        }));
    }
}
