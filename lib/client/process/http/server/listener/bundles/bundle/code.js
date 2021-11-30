module.exports = async function (packager, resource) {
    'use strict';

    const {code} = packager;
    await code.ready;

    if (resource.diagnostics) {
        return code.valid ?
            new global.Resource({content: 'Bundle is not reporting any errors or warnings', extname: '.html'}) :
            new global.Resource({'500': await require('./diagnostics')(packager, code), extname: '.html'});
    }
    else {
        return code.valid ?
            new global.Resource({
                content: code.code ? require('../sourcemap')(code.code, code.map) : '',
                extname: '.js'
            }) :
            new global.Resource({'500': 'Bundle compiled with errors'});
    }
}
