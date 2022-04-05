const {fs} = global.utils;
module.exports = async function (builder, module, paths) {
    //TODO falta recorrer los transversales para obtener las dependencias externals

    builder.emit('message', 'Copying external resources');

    /*
        TODO
          beyond_context ignorarlo ya que es de tipo kind = internal
          tomar externals y agregarlos en la entrada UIMPORT del package.json del paquete compilado
          validar error de libreria socket.io cuando se reinicia el servicio
     */

    const {externals} = module;
    const {application} = builder;

    const UIPaths = {
        cwd: application.path, // The working directory
        temp: '.beyond/uimport/temp', // Directory relative to the working directory, where uimport will create temporary files
        cache: require("path").join(process.cwd(), '.beyond/uimport')
    };

    console.log('externals', externals)
    const promises = [];
    for (const external of externals) {
        const {code, errors} = await require('uimport')(external, UIPaths);

        console.log(1, external, UIPaths, !!code, !!errors)
        if (errors) {
            builder.emit('error', `  . Errors found on external "${external}": ${errors}`);
            continue;
        }

        builder.emit('message', `  . Building resource "${external}"`);
        const path = require('path').join(paths.www, 'packages', `${external}.js`);
        promises.push(fs.save(path, code));
    }
    await Promise.all(promises);
}