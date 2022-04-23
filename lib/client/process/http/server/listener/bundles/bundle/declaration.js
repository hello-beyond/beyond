module.exports = async function (packager, resource, info) {
    'use strict';

    const {declaration} = packager;
    await declaration.ready;

    if (info) {
        return await require('./info')(packager, declaration, '.d.ts');
    }
    else {
        return declaration.valid ?
            new global.Resource({content: declaration.code, extname: '.d.ts'}) :
            new global.Resource({'500': 'Declaration compiled with errors'});
    }
}
