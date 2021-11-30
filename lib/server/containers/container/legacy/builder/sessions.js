const {fs} = global.utils;

module.exports = async function (backend, target, events) {
    const {sessions} = backend;
    const source = sessions.path;
    if (!source || !await fs.exists(source)) return;

    target = require('path').join(target, 'sessions');
    await fs.copy(source, target, {'recursive': true});

    events.emit('message', '. sessions build is completed');
}
