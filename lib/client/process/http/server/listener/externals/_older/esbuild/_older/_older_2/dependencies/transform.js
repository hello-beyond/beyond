const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

/**
 * Transforms the esbuild imports to global imports
 * Ex: node_modules/svelte/internal/internal.js => svelte/internal
 */
module.exports = function (code, application) {
    let ast;
    try {
        ast = parse(code);
    }
    catch (exc) {
        return {errors: [exc.message]};
    }

    const errors = [];
    traverse(ast, {
        CallExpression({node}) {
            if (node.callee.name !== 'require') return;
            const required = node.arguments[0];

            const {solved, errors: e} = require('./find')(required.value, application);
            e?.forEach(error => errors.push(error));
            if (e) return;

            required.value = solved;
        }
    });

    try {
        code = generate(ast, code).code;
    }
    catch (exc) {
        return {errors: [exc.message]};
    }

    return errors.length ? {errors} : {code};
}
