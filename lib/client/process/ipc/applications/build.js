const {ipc} = global.utils;

// To register the message dispatchers only once
const dispatchers = new Set;
let messageId = 0;

module.exports = async function (applications, id, distribution) {
    'use strict';

    const path = await ipc.exec('main', 'ids.path/get', id);

    await applications.ready;
    if (!applications.has(path)) return;

    const application = applications.get(path);
    if (application.builder.processing) {
        throw new Error(`Application "${path}" already being built`);
    }

    // Dispatch of events
    if (!dispatchers.has(path)) {
        dispatchers.add(path);

        const notify = (message, error) => ipc.notify('builder-notification', {
            type: 'build/application/message',
            application: application.id,
            error: error ? true : undefined,
            id: ++messageId,
            text: message
        });

        const {ipc} = global.utils;
        application.builder.on('message', notify);
        application.builder.on('error', message => notify(message, true));
    }

    await application.builder.build(distribution);
}
