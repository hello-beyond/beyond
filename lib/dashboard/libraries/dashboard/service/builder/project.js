require('colors');
const {join, sep} = require('path');
const fs = global.utils.fs;
module.exports = function (ipc) {
    const {Project} = (require('./models'));

    this.create = async params => {
        try {
            const server = await ipc.getServer();
            const dirname = join(ipc.wd, params.name);
            if (await fs.exists(dirname)) {
                return {status: false, error: `APP_EXISTS`};
            }

            const project = new Project(dirname, params);

            await project.create(params.type, params);
            let relativePath = project.file.file.replace(ipc.wd, '');

            if (sep !== '/') relativePath = relativePath.replace(/\\/g, '/');

            await server.addProject(relativePath);
            const applicationId = await ipc.main('ids.path/generate', project.file.file);
            server.save();
            return {status: true, data: {id: applicationId}};
        }
        catch (exc) {
            console.error(1, exc);
            return {status: false, error: exc.message}
        }
    };

    const getPath = async applicationId => {
        const appData = await ipc.exec('applications/get', [applicationId]);
        return appData[applicationId].path;
    };

    const getApp = async id => {
        if (!id) throw Error('The application id is necessary');
        const path = await getPath(id);
        return new Project(path);
    }

    /**
     *  Checks if the folder where files going to be located exist.
     * @param params
     * @returns {Promise<void>}
     */
    this.checkStatic = async params => {
        const app = await getApp(params.applicationId);
        await app.load();

        if (!Array.isArray(app.static.includes)) {
            throw 'La entrada includes no es un array';
        }

        if (!app.static.includes.includes(params.static.path)) {
            app.static.includes.push(params.static.path);
        }
        app.save();
    };

    this.setDistribution = async params => {
        const app = await getApp(params.applicationId);
        const response = app.setDistribution(params.distribution);
        if (response.error) {
            return {status: 'error', error: response.error};
        }
        return app.save();
    }

    this.edit = async params => {
        const app = await getApp(params.applicationId);
        return app.save(params);
    };

    this.backend = async params => {
        const app = await getApp(params.applicationId);
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
