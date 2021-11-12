module.exports = async function (application, distribution, transversal, resource) {
    'use strict';

    if (resource.extname !== '.js') {
        return new global.Resource({'404': `Resource extension "${resource.extname}" is invalid`});
    }

    await transversal.ready;

    const check = resource.checkLanguage(transversal.multilanguage);
    if (check.error) return check.error;

    const tp = transversal.packagers.get(distribution, resource.language);
    await tp.ready;

    const {code} = tp;
    await code.ready;

    if (resource.diagnostics) {
        return code.valid ?
            new global.Resource({content: 'Bundle is not reporting any errors or warnings', extname: '.html'}) :
            new global.Resource({'500': await require('./diagnostics')(tp), extname: '.html'});
    }
    else {
        return code.valid ?
            new global.Resource({
                content: code.code ? require('../sourcemap')(code.code, code.map) : '', extname: '.js'
            }) :
            new global.Resource({'500': 'Bundle compiled with errors'});
    }
}
