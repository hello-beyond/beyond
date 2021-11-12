module.exports = function (source) {
    'use strict';

    let compiled;
    const cwd = process.cwd();
    try {
        process.chdir(__dirname); // To make babel to look plugins from here and not from process.cwd()
        const plugins = {plugins: ['@babel/plugin-transform-react-jsx']};
        compiled = require('@babel/core').transform(source, plugins);
    }
    catch (exc) {
        return {errors: [`Error compiling jsx processor: ${exc.message}`]};
    }
    finally {
        process.chdir(cwd);
    }

    return {code: compiled.code};
}
