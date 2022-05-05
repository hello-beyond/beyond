const ts = require('typescript');
/**
 * The declaration transform function of each module
 *
 * @param compiler {object}
 * @param module {string} The internal module being processed
 * @param imports {object}
 * @param ims {Map<string, object>} The internal modules
 * @returns {function(*=): *}
 */
module.exports = (compiler, module, imports, ims) => context => rootNode => {
    const {factory} = context;
    const Kind = ts.SyntaxKind;

    function visit(node) {
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
            // These imports have to be changed from: import('./module').type to: ns_module.type
            // when the import refers to an internal module
            const identifier = (() => {
                if (dependencies.has(dependency)) {
                    return dependencies.get(dependency);
                }

                const im = ((dependency, module) => {
                    const path = require('path');
                    module = path.resolve(module, '..'); // Remove the filename

                    let im = path.resolve(module, dependency);
                    // The resolve function resolves adding the path of the process.cwd, so remove it
                    // Remove also the root slash
                    return im.slice(process.cwd().length).slice(1);
                })(dependency, module);

                if (ims.has(im)) return require('../namespaces/name')(compiler, im);
            })();

            if (!identifier) return node;

            return factory.createTypeReferenceNode(
                factory.createQualifiedName(
                    factory.createIdentifier(identifier),
                    node.qualifier
                ), node.typeArguments
            );
        }

        // Remove exports
        if (node.kind === Kind.ExportDeclaration) return;

        return ts.visitEachChild(node, visit, context);
    }

    return ts.visitNode(rootNode, visit);
}
