const {ipc} = global.utils;

module.exports = function (application, message) {
    ipc.exec('main', 'bee.log', {application: application.id, message});
}
