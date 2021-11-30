require('colors');
module.exports = function (ipc) {
    const {Application} = (require('./models'));

    this.create = async params => {
        try {
            const server = await ipc.getServer();
            const app = new Application(ipc.wd, params);

            const fs = global.utils.fs;
            if (await fs.exists(app._path)) {
                return {status: false, error: `Ya existe una carpeta ${params.name} en su directorio`};
            }
            await app.create(params.type, params);
            server.addApplication(app.relativePath());
            server.save();
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

    this.checkStatic = async params => {
        const app = await getApp(params);

        if (app._static) return;

        app.save(params);
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
