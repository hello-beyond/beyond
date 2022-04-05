const ts = require('typescript');
const tsKind = ts.SyntaxKind;

const push = (dependencies, resource, is) => {
    const set = dependencies.has(resource) ? dependencies.get(resource) : new Set();
    set.add(is);
    dependencies.set(resource, set);
}

/**
 * Analyze if node is a dependency
 */
const analyze = function (node, dependencies) {
    const isIM = dependency => dependency.startsWith('.');

    // es6 dynamic import
    if (node.kind === tsKind.CallExpression && node.expression &&
        node.expression.kind === tsKind.ImportKeyword && node.arguments.length === 1 &&
        node.arguments[0].kind === tsKind.StringLiteral) {

        const resource = node.arguments[0].text;
        !isIM(resource) && push(dependencies, resource, 'dynamic.import');
        return;
    }
    // es6 import
    else if ([tsKind.ImportDeclaration, tsKind.TSImportEqualsDeclaration].includes(node.kind) && node.moduleSpecifier) {
        // Excludes the internal modules
        const resource = node.moduleSpecifier.text;
        if (isIM(resource)) return;

        const is = resource === 'beyond_context' ? 'internal.import' :
            (!node.importClause?.isTypeOnly ? 'import' : 'type');

        push(dependencies, resource, is);
        return;
    }

    // Keep looking for dependencies
    ts.forEachChild(node, analyze);
}

module.exports = analyze;
