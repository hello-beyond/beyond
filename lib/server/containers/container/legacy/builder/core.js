const {fs} = global.utils;

module.exports = async function (backend, target, events) {
    const {core} = backend;
    const source = core.path;
    if (!source || !await fs.exists(source)) return;

    target = require('path').join(target, 'core');
    await fs.copy(source, target, {'recursive': true});

    events.emit('message', '. core build is completed');
}
