module.exports = function (io, shared, dashboard) {
    const {ipc} = global.utils;

    const process = dashboard ? 'dashboard-client' : 'main-client';
    ipc.events.on(process, 'processors', message => {
        switch (message.type) {
            case 'change':
                const {bundle, extname, processor, distribution, language} = message;
                io.emit(`processor/change`, {bundle, extname, processor, distribution, language});
                break;
        }
    });

    ipc.events.on(process, 'application-styles', message => {
        io.emit('application-styles', message);
    });
}
