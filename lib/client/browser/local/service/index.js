module.exports = function (io, shared, dashboard) {
    const {ipc} = global.utils;

    const process = dashboard ? 'dashboard-client' : 'main-client';
    ipc.events.on(process, 'bundles', message => {
        switch (message.type) {
            case 'change':
                const {bundle, extname, distribution, language} = message;
                io.emit(`bundle/change`, {bundle, extname, distribution, language});
                break;
        }
    });

    ipc.events.on(process, 'application-styles', message => {
        io.emit('application-styles', message);
    });
}
