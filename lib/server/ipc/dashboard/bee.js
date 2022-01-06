module.exports = async function (instances) {
    'use strict';

    const {containers} = instances.get('main');
    await containers.ready;

    const dashboard = containers.dashboard;
    await dashboard.ready;

    await dashboard.containers.ready;
    const container = [...dashboard.containers.values()][0];
    await container.ready;
    await container.legacy.ready;

    return container.legacy;
}
