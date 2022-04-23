const p = require('path');
const {fs} = global.utils;
module.exports = async function (builder, module, distribution, paths) {
    const {externals} = module;
    const platformsExternals = ['web', 'android', 'ios', 'web.ssr'];

    if (!platformsExternals.includes(distribution.platform)) {
        //distribution = backend, node, ssr
        return externals;
    }
    /*
     TODO
        beyond_context ignorarlo ya que es de tipo kind = internal
        tomar externals y agregarlos en la entrada UIMPORT del package.json del paquete compilado
        validar generacion automatica socket.io-client
        falta recorrer los transversales para obtener las dependencias externals
     */
    builder.emit('message', 'Copying external resources');

    const {application} = builder;
    const UIPaths = {
        cwd: application.path, // The working directory
        temp: '.beyond/uimport/temp', // Directory relative to the working directory, where uimport will create temporary files
        cache: p.join(process.cwd(), '.beyond/uimport')
    };

    externals.add('socket.io-client');

    const processed = new Set();
    const promises = [];
    for (const external of externals) {
        const {code, errors} = await require('uimport')(external, UIPaths);
        if (errors) {
            builder.emit('error', `  . Errors found on external "${external}": ${errors}`);
            continue;
        }

        const split = external.split('/');
        const id = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();
        const file = await fs.readFile(p.join(application.path, 'node_modules', id, 'package.json'), 'utf8');
        const json = JSON.parse(file);
        if (json.static) {
            for (const file of Object.values(json.static)) {
                const source = p.join(application.path, 'node_modules', id, file);
                const target = p.join(paths.www, 'packages', id, file);

                await fs.mkdir(p.join(target, '..'), {'recursive': true});
                await fs.copyFile(source, target);
            }
        }

        builder.emit('message', `  . Building resource "${external}"`);
        const path = p.join(paths.www, 'packages', `${external}.js`);
        promises.push(fs.save(path, code));
        processed.add(external);
    }
    await Promise.all(promises);

    return processed;
}