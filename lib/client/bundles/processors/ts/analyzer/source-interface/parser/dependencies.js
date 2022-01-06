const ts = require('typescript');
const tsKind = ts.SyntaxKind;

/**
 * Analyze if node is a dependency
 */
const analyze = function (node) {
    const isImport = [tsKind.ImportDeclaration, tsKind.ImportKeyword].includes(node.kind);
    isImport && !node.moduleSpecifier && console.log(node);

    const isInternal = dependency => dependency.startsWith('.');

    // es6 dynamic import
    if (node.kind === tsKind.CallExpression && node.expression &&
        node.expression.kind === tsKind.ImportKeyword && node.arguments.length === 1 &&
        node.arguments[0].kind === tsKind.StringLiteral) {

        const resource = node.arguments[0].text;
        return isInternal(resource) ? undefined : [{resource: resource, info: {is: 'import'}}];
    }
    // es6 import
    else if ([tsKind.ImportDeclaration, tsKind.TSImportEqualsDeclaration].includes(node.kind) && node.moduleSpecifier) {
        // Excludes the internal modules
        const resource = node.moduleSpecifier.text;
        if (isInternal(resource)) return;

        const is = !node.importClause?.isTypeOnly ? 'import' : 'type';

        return isInternal(resource) ? undefined : [{resource: resource, info: {is: is}}];
    }

    // Keep looking for dependencies
    const dependencies = [];
    ts.forEachChild(node, child => {
        const d = analyze(child);
        d?.forEach(dependency => dependencies.push(dependency));
    });
    return dependencies.length ? dependencies : undefined;
};

module.exports = analyze;
