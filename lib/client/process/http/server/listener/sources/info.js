const {ipc} = global.utils;
let dashboardPort;

module.exports = async function (processor, source, distribution) {
    const port = await (async () => {
        if (dashboardPort) return dashboardPort;

        const use = `dashboard/${distribution.monitor}`;
        const dashboard = distribution.monitor === 'dashboard'
        return dashboardPort = await ipc.exec('main', 'ports.reserve', use, dashboard);
    })();

    const {bundle} = processor;
    const {container} = bundle;

    let content = '';

    content += `<h1>Bundle</h1>`;
    content += container.container ? `<p><strong>Container package:</strong> ${container.container.package}</p>` : '';
    content += `<p><strong>Path:</strong> ${container.path}</p>`;
    content += `<p><strong>Resource:</strong> ${bundle.resource}</p>`;

    content += `<h1>File</h1>`;
    content += `<p><strong>Relative path:</strong> ${source.relative.file}</p>`;
    content += `<p><strong>File length:</strong> ${source.content.length}</p>`;
    content += `<p><strong>File hash:</strong> ${source.hash}</p>`;
    content += `<a href="http://localhost:${port}/edit?${source.id}">Click to edit source</a>`;

    return await require('../info/html')(content);
}
