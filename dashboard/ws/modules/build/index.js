const {ipc} = global.utils;

/**
 * Objeto que se encarga de las compilaciones
 */
module.exports = function () {
    this.service = params => ipc.exec('main', 'bee/build', params);

    this.library = (params, session) => {
        const monitor = `${session.monitor}-client`;
        return ipc.exec(monitor, 'build/library', params);
    };

    this.application = (params, session) => {
        const monitor = `${session.monitor}-client`;
        return ipc.exec(monitor, 'applications/build', params.path, params.distribution);
    };
};