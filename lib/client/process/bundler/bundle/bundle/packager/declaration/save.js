const fs = require('fs').promises;

module.exports = async function (bundle, code) {
    const {application, container} = bundle;

    // The container of the bundle can be a library or a module
    const root = application.modules.self.path;
    const pkg = container.is === 'application.module' ? container.container.package : container.package;
    const name = container.is === 'application.module' ? container.name : '';

    const dir = require('path').join(root, 'node_modules', pkg, name);
    if (!await global.utils.fs.exists(dir)) await global.utils.fs.mkdir(dir, {recursive: true});

    const path = require('path').join(root, 'node_modules', pkg, name, `${bundle.name}.d.ts`);
    try {
        await fs.writeFile(path, code, 'utf8');
    }
    catch (exc) {
        console.log(`Error saving declaration of bundle "${bundle.id}". ${exc.message}`);
    }
}
