const p = require('path');
const {fs} = global.utils;
module.exports = async function (builder, distribution) {
    const setExternals = ['backend', 'node', 'ssr'];
    if (!setExternals.includes(distribution.platform)) {
        return {"socket.io-client": "^4.4.1"};
    }

    const items = {};
    const {application} = builder;
    const packageJson = await fs.readFile(p.join(application.path, 'package.json'), 'utf8');
    const {dependencies, clientDependencies} = JSON.parse(packageJson);
    Object.keys(dependencies).forEach(i => {
        if (!!(clientDependencies && clientDependencies.includes(i))) return;
        items[i] = dependencies[i];
    });

    return items;
}