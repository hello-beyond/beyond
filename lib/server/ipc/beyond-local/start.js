module.exports = instances => async function (instance) {
    'use strict';

    instance = instance ? instance : 'main';
    if (!['main', 'dashboard'].includes(instance)) throw new Error(`Instance "${instance}" is invalid`);
    const {libraries} = instances.get(instance).containers;
    await libraries.ready;

    const promises = [];
    libraries.forEach(container => promises.push(container.ready));
    await Promise.all(promises);

    const container = [...libraries.values()].find(container => container.package === '@beyond-js/local');
    if (!container) throw new Error(`Local bee (@beyond-js/local) not found`);

    await container.ready;

    const bee = container.legacy;
    await bee.ready;
    return await bee.start();
}
