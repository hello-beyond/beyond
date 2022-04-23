const p = require('path');
const {fs} = global.utils;
module.exports = async function (builder, distribution) {
    const setExternals = ['backend', 'node', 'ssr'];
    if (!setExternals.includes(distribution.platform)) {
        return {"socket.io-client": "^4.4.1"};
    }

    const dependenciesJson = {};
    const {application} = builder;
    const json = await fs.readFile(p.join(application.path, 'package.json'), 'utf8');
    const {dependencies, clientDependencies} = JSON.parse(json);
    Object.keys(dependencies).forEach(i => !clientDependencies.includes(i) && (dependenciesJson[i] = dependencies[i]));

    return dependenciesJson;
}