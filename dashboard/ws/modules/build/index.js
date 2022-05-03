const {ipc} = global.utils;

module.exports = async function (params) {
    return await ipc.exec('main-client', 'applications/build', params.application, params.distribution);
}
