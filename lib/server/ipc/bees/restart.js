module.exports = instances => async function (id, instance) {
    'use strict';

    instance = instance ? instance : 'main';
    if (!['main', 'dashboard'].includes(instance)) throw new Error(`Instance "${instance}" is invalid`);
    const {containers} = instances.get(instance);

    const bee = await require('./get')(containers, id);
    if (!bee) throw new Error(`Requested bee "${id}" not found`);
    if (bee.process?.status !== 'running') return;

    const onStop = () => {
        bee.off('stopped', onStop);
        bee.start();
    };
    bee.on('stopped', onStop);
    bee.stop();

    return bee;
}