const ts = require('typescript');
const {factory} = ts;
const tsKind = ts.SyntaxKind;
const printer = ts.createPrinter();

/**
 * Process a bridge source file
 *
 * @param source {object} The source being analyzed
 * @return {{content: string, info: Map<any, any>} | undefined}
 * If undefined, it means that the source that not expose any actions
 */
module.exports = function (source) {
    const {content} = source;
    const {file} = source.relative;
    const tsource = ts.createSourceFile(file, content);
    let info = new Map();

    // Traverse AST
    let found = false;
    const traverse = context => root => {
        const analyze = node => {
            if (node.kind === ts.SyntaxKind.SourceFile) return ts.visitEachChild(node, analyze, context);

            // Check if node has the 'export' modifier
            if (!ts.isClassDeclaration(node) || !node.modifiers ||
                !node.modifiers.find(modifier => modifier.kind === tsKind.ExportKeyword)) return null;

            // Check if node specifies that it is an actions class
            const check = node => {
                const text = tsource.text.substr(node.getStart(tsource), 20);
                return /\/\*(\s*)actions(\s*)\*\//.test(text);
            };

            if (!node.name || !check(node)) return null;
            const className = node.name.escapedText;
            if (!className) return null;

            found = true;

            const heritage = factory.createHeritageClause(
                ts.SyntaxKind.ExtendsKeyword,
                [factory.createExpressionWithTypeArguments(
                    factory.createIdentifier('ActionsBridge'),
                    undefined
                )]
            );

            node = ts.updateClassDeclaration(node, node.decorators, node.modifiers,
                node.name, node.typeParameters, ts.createNodeArray([heritage]), node.members);

            // Remove constructor
            node.members = node.members.filter(member => !ts.isConstructorDeclaration(member));

            const constructor = factory.createConstructorDeclaration(
                undefined,
                undefined,
                [],
                factory.createBlock(
                    [factory.createExpressionStatement(factory.createCallExpression(
                        factory.createSuper(),
                        undefined,
                        [factory.createIdentifier('module')]
                    ))],
                    true
                )
            );

            node.members.push(constructor);

            // At this point, the node is a BeyondJS actions class
            const parsed = require('./methods')(file, className, node, context);
            info.set(className, parsed.info);
            return parsed.node;
        }

        return ts.visitNode(root, analyze, context);
    };

    const result = ts.transform(tsource, [traverse]);
    if (!found) return;

    const code =
        `import {ActionsBridge} from '@beyond-js/kernel/core/ts';\n` +
        `import {module} from 'beyond_context';\n\n` +
        printer.printFile(result.transformed[0]);

    return {content: code, info};
}
