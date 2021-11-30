module.exports = function (parent, ipcManager) {
    /**
     * Rename filename
     * @param params
     * @returns object
     */
    parent.clone = async function (params) {
        const fs = global.utils.fs;

        const appId = params.moduleId.split('//')[1];
        let application = await ipcManager.exec('applications/get', [appId]);
        application = application[appId];

        let module = await ipcManager.exec('modules/get', [params.moduleId]);
        module = module[params.moduleId];

        const current = module.path;
        const toCreate = require('path').join(application.modulesPath, params.name);

        try {
            if (!await fs.exists(current)) {
                console.error({error: true, code: 'FILE_NOT_FOUND'})
                return {error: true, code: 'FILE_NOT_FOUND'};
            }

            await fs.copy(current, toCreate);

            const {Module} = (require('../builder/models'));
            const module = new Module(toCreate);
            await module.save({name: params.name});

            return {status: true};
        }
        catch (e) {
            return {error: true, code: e};
        }
    };
}