const ts = require('typescript');

/**
 * The tranformation function to wrap each module in its corresponding typescript namespace
 *
 * @param module {string} The internal module path
 */
module.exports = module => context => rootNode => {
    const {factory} = context;
    const Kind = ts.SyntaxKind;

    const name = require('./name')(module);

    function visit(node) {
        if (node.kind === Kind.SourceFile) {
            return factory.createModuleDeclaration(
                undefined,
                [factory.createModifier(Kind.DeclareKeyword)],
                factory.createIdentifier(name),
                factory.createModuleBlock(ts.visitNodes(node.statements, visit, context)),
                ts.NodeFlags.Namespace
            );
        }

        // Remove 'declare' and 'export' modifiers
        // 'declare' modifiers cannot be used in an already ambient context
        // 'export' is not required as the real export is at the module level at the end of the declaration file
        node.modifiers = node.modifiers ?
            node.modifiers.filter(
                modifier => ![Kind.DeclareKeyword, Kind.ExportKeyword].includes(modifier.kind)) :
            node.modifiers;

        return node;
    }

    return ts.visitNode(rootNode, visit);
}
