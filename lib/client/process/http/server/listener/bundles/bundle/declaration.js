module.exports = async function (packager, resource) {
    'use strict';

    const {declaration} = packager;
    await declaration.ready;

    if (resource.diagnostics) {
        return declaration.valid ?
            new global.Resource({content: 'Bundle is not reporting any errors or warnings', extname: '.html'}) :
            new global.Resource({'500': await require('./diagnostics')(packager, declaration), extname: '.html'});
    }
    else {
        return declaration.valid ?
            new global.Resource({content: declaration.code, extname: '.d.ts'}) :
            new global.Resource({'500': 'Declaration compiled with errors'});
    }
}
