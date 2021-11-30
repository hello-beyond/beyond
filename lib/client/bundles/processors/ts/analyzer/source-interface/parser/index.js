const ts = require('typescript');

/**
 * Extract the dependencies and exports of a typescript source code
 *
 * @param file {string} The relative path of the file
 * @param content {string} The content of the file
 * @return {{}}
 */
module.exports = function (file, content) {
    const source = ts.createSourceFile(file, content);

    const output = {};
    output.dependencies = new Map();
    output.exports = new Set();

    // Find triple slash directives
    const re = /^\/\/\/\s*<reference\s*path\s*=\s*["'](.*)["'].*$/gm;
    let dependency;
    while ((dependency = re.exec(this.content))) {
        output.dependencies.set(dependency, {is: 'reference'});
    }

    // Traverse AST
    const visit = node => {
        if (node.kind === ts.SyntaxKind.SourceFile) return;

        const dependencies = require('./dependencies')(node);
        dependencies?.forEach(dependency => output.dependencies.set(dependency.resource, dependency.info));

        const exports = require('./exports')(node, source);
        exports && exports.forEach(name => output.exports.add(name));
    }

    ts.forEachChild(source, visit);
    return output;
};
