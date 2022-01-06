const {fs} = global.utils;

module.exports = async function (bundle, code) {
    const {application, container} = bundle;

    // The container of the bundle can be a library or a module
    const root = application.modules.self.path;
    const pkg = container.is === 'module' ? container.container.package : container.package;
    const name = container.is === 'module' ? container.name : '';

    const path = require('path').join(root, 'node_modules', pkg, name, `${bundle.name}.d.ts`);
    await fs.save(path, code);
}
