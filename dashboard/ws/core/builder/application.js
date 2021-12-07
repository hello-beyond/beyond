require('colors');
module.exports = function (ipc) {
    const {Application} = (require('./models'));

    this.create = async params => {
        try {
            const server = await ipc.getServer();
            const app = new Application(ipc.wd, params);

            const fs = global.utils.fs;

            if (await fs.exists(require('path').join(app._path, params.name))) {
                return {status: false, error: `APP_EXISTS`};
            }
            await app.create(params.type, params);

            await server.addApplication(app.relativePath());
            const applicationId = await ipc.main('ids.path/generate', app.path);
            return {status: true, data: {id: applicationId}};
        }
        catch (exc) {
            console.error(1, exc);
            return {status: false, error: exc.message}
        }
    };

    const getPath = async applicationId => {
        let appData = await ipc.exec('applications/get', [applicationId]);
        appData = appData[applicationId];
        return appData.path;
    };

    const getApp = async params => {
        if (!params.applicationId) {
            throw Error('The application id is necessary');
        }
        const path = await getPath(params.applicationId);
        return new Application(path);
    }

    /**
     *  Checks if the folder where files going to be located exist.
     * @param params
     * @returns {Promise<void>}
     */
    this.checkStatic = async params => {

        const app = await getApp(params);

        if (!Array.isArray(app._static.includes)) {
            throw 'La entrada includes no es un array';
        }

        if (!app._static.includes.includes(params.static.path)) {
            app._static.includes.push(params.static.path);
        }

        app.save();
    };

    this.edit = async params => {
        const app = await getApp(params);
        !!params.deployment?.distributions && app.deployment.addDistribution(params.deployment.distributions);

        return app.save(params);
    };

    this.backend = async params => {
        const app = await getApp(params);

        return app.backend.create();
    }

    this.checkPort = async params => {
        if (!params.port) {
            return {status: false, error: 'PORT_REQUIRED'};
        }

        const available = await ipc.main('ports.check', params.port);
        return {status: true, valid: available};
    }
}
