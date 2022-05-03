/**
 * Detect and transform an import of the form:
 * import defaultExport from "module-name";
 *
 * @param importName {string} The name of the variable assigned to the module being imported
 * @param node {object} The import node of the AST
 * @param factory {object} The factory of the transform function
 */
module.exports = function (importName, node, factory) {
    // Detect how the import is being assigned
    const clause = node.importClause;

    // import name from 'module';
    if (clause?.name) {
        // Translated as:
        // defaultExport = dependency_x.default;
        // Where dependency_x is the name assigned to the import
        return factory.createImportEqualsDeclaration(
            undefined,
            undefined,
            false,
            factory.createIdentifier(clause.name.escapedText),
            factory.createIdentifier(importName)
        );
    }
}
