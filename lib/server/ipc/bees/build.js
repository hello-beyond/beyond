const {ipc} = global.utils;

let messageId = 0;

// To register the message dispatchers only once
const dispatchers = new Set;

module.exports = instances => async function (id, instance) {
    'use strict';

    instance = instance ? instance : 'main';
    if (!['main', 'dashboard'].includes(instance)) throw new Error(`Instance "${instance}" is invalid`);
    const {containers} = instances.get(instance);

    const bee = await require('./get')(containers, id);
    const {builder} = bee;
    if (builder.processing) {
        throw new Error(`Backend "${id}" already being built`);
    }

    // Dispatch of events
    if (!dispatchers.has(id)) {
        dispatchers.add(id);
        builder.on('message', message => ipc.events.emit('legacy-builder-notification', {
            bee: id,
            id: ++messageId,
            text: message
        }));
    }

    return builder.build();
}
