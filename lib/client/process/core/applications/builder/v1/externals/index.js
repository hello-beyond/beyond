const p = require('path');
const {fs} = global.utils;
/*
 TODO
    beyond_context ignorarlo ya que es de tipo kind = internal
    tomar externals y agregarlos en la entrada UIMPORT del package.json del paquete compilado
    validar generacion automatica socket.io-client y dependencias
    falta recorrer los transversales para obtener las dependencias externals
 */
module.exports = async function (builder, module, distribution, paths) {
    const clientPlatforms = ['web', 'android', 'ios', 'web.ssr'];

    //distribution = backend, node, ssr
    if (!clientPlatforms.includes(distribution.platform)) {
        return module.externals;
    }

    builder.emit('message', 'Copying external resources');

    const {application} = builder;
    const UIPaths = {
        cwd: application.path, // The working directory
        temp: '.beyond/uimport/temp', // Directory relative to the working directory, where uimport will create temporary files
        cache: p.join(process.cwd(), '.beyond/uimport')
    };

    const processed = new Set();
    const generate = async items => {
        const pkg = new Map();

        let arr = [];
        for (const item of items) {
            if (processed.has(item)) continue;
            const {code, errors, warnings, dependencies} = await require('uimport')(item, UIPaths);
            if (errors) {
                builder.emit('error', `  . Errors found on external "${item}": ${errors}`);
                continue;
            }

            arr = arr.concat(dependencies, [item]);
            pkg.set(item, code);
        }

        const promises = [];
        pkg.forEach((code, id) => {
            builder.emit('message', `  . Building resource "${id}"`);
            const path = p.join(paths.www, 'packages', `${id}.js`);
            promises.push(fs.save(path, code));
            processed.add(id);
        });
        await Promise.all(promises);

        const uImport = [...new Set(arr)];
        [...uImport.values()].length && await generate([...uImport.values()]);
    }

    const {all, client} = module.externals;
    await generate(all);
    await require('./static')(processed, application, paths);

    return {all: processed, client};
}