require('colors');
module.exports = function (ipc) {
    const getPath = async (applicationId) => {
        let appData = await ipc.exec('applications/get', [applicationId]);
        appData = appData[applicationId];
        return appData.path;
    };

    this.create = async (params, session) => {
        try {
            const {applicationId} = params;
            const applicationPath = await getPath(applicationId);

            const {Application, Module} = (require('./models'));

            const app = new Application(applicationPath);
            const name = params.bundle === 'layout' ? `layouts/${params.name}` : params.name;

            const module = new Module(app.modulesPath, name);

            if (module.exists) {
                return {status: 'ok', error: 'The module already exists'};
            }

            await module.create(params);
            return {status: 'ok', data: true};
        }
        catch (exc) {
            console.error(exc);
            return {error: exc.message};
        }
    };

    this.clone = async (params, session) => {
        try {
            const {applicationId} = params;
            const applicationPath = await getPath(applicationId);
            const {Application, Module} = (require('./models'));
            const app = new Application(applicationPath);

            const name = params.bundle === 'layout' ? `layouts/${params.name}` : params.name;
            const module = new Module(app.modulesPath, name);

            if (module.exists) {
                console.error({status: 'ok', error: 'The module already exists'}.cyan);
                return {status: 'ok', error: 'The module already exists'};
            }
            await module.clone(params);

            return {status: 'ok', data: true};
        }
        catch (e) {
            console.error(e);
            return {error: e.message};
        }
    }

    this.edit = async (params, session) => {
        let data = await ipc.exec('modules/get', [params.moduleId]);
        data = data[params.moduleId];
        const {Module} = (require('./models'));
        const module = new Module(data.dirname ?? data.path);

        //Si estamos pasando el static y ya existe no hacemos nada
        if (params.static && module._static) return;

        delete params.moduleId;
        await module.save(params);

        return data;
    };

    this.addBundle = async (params, session) => {
        let data = await ipc.exec('modules/get', [params.moduleId]);
        data = data[params.moduleId];
        const {Module} = (require('./models'));
        const module = new Module(data.dirname ?? data.path);

        await module.addBundle(params);

        return {status: 'ok', data: true};
    }
}