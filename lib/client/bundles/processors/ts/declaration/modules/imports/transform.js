const ts = require('typescript');
/**
 * The declaration transform function of each module
 *
 * @param module {string} The internal module being processed
 * @param imports {object}
 * @returns {function(*=): *}
 */
module.exports = (module, imports) => (context) => (rootNode) => {
    const {factory} = context;
    const Kind = ts.SyntaxKind;

    function visit(node) {
        const excludes = [Kind.VariableStatement, Kind.TypeAliasDeclaration];
        if (excludes.includes(node.kind)) return node;

        if (node.kind === Kind.SourceFile) {
            return ts.visitEachChild(node, visit, context);
        }
        if (node.kind === Kind.ImportDeclaration) {
            return imports.add(module, node, factory);
        }
        if (node.kind === Kind.ImportType) {
            const {dependencies} = imports;
            const dependency = node.argument.literal.text;

            if (dependency === 'react') return node;

            // These are imports that the compiler generates and points to namespaces
            // These imports have to be changed from: import('./module').type
            // to: ns_module.type
            const identifier = dependencies.has(dependency) ?
                dependencies.get(dependency) :
                require('../namespaces/name')(dependency, module);

            return factory.createTypeReferenceNode(
                factory.createQualifiedName(
                    factory.createIdentifier(identifier),
                    factory.createIdentifier(node.qualifier.escapedText)
                ), node.typeArguments
            );
        }

        // Remove exports
        if (node.kind === Kind.ExportDeclaration) return;

        return ts.visitEachChild(node, visit, context);
    }

    return ts.visitNode(rootNode, visit);
}
