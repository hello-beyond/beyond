const {ipc} = global.utils;

module.exports = function (io) {
    const ipcManager = require('./ipc-manager');
    this.dashboard = new (require('./dashboard'))();
    this.builder = new (require('./builder'))(ipcManager);
    this.sources = new (require('./sources'))(ipcManager);

    ipc.events.on('main-client', 'data-notification', message => {
        const {type} = message;
        if (!['record/update', 'list/update', 'record/field/update'].includes(type)) {
            console.error(`Invalid client data-notification type "${type}"`);
            return;
        }
        io.emit(`client:plm/${type}`, message);
    });

    ipc.events.on('main-client', 'builder-notification', message => {
        const {type} = message;
        if (!['build/application/message', 'build/application/error'].includes(type)) {
            console.error(`Invalid application builder-notification type "${type}"`);
            return;
        }
        io.emit(`builder:${message.application}`, message);
    });

    ipc.events.on('main-client', 'declarations-save', message =>
        io.emit(`declaration-save:${message.applicationId}`, message)
    );

    ipc.events.on('main', 'data-notification', message => {
        const {type} = message;
        if (!['record/update', 'list/update', 'record/field/update'].includes(type)) {
            console.error(`Invalid server data-notification type "${type}"`);
            return;
        }
        io.emit(`server:plm/${message.type}`, message);
    });

    ipc.events.on('main', 'bee.log', message => io.emit(`bees.log`, message));
}
