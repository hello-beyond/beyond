const toHtml = new (require('ansi-to-html'));

// Convert from ES6 module to a CJS module
module.exports = function (code, map) {
    'use strict';

    let output;
    try {
        output = require('@babel/core').transform(code, {
            cwd: __dirname,
            sourceMaps: true,
            inputSourceMap: map,
            compact: false,
            plugins: [['@babel/plugin-transform-modules-commonjs', {importInterop: 'none'}]],
        });
    }
    catch (exc) {
        let message = toHtml.toHtml(exc.message);
        message = message.replace(/\n/g, '<br/>');
        message = `<div style="background: #333; color: white;">${message}</div>`;
        message = `Error transforming to CJS module: <br/><br/>${message}`;
        return {errors: [message]};
    }

    return {code: output.code, map: output.map};
}
