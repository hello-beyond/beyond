const ts = require('typescript');
const tsKind = ts.SyntaxKind;

/**
 * Analyze if node is an export
 */
module.exports = function (node, source) {
    // Check if node has the 'export' modifier
    if (!node.modifiers || !node.modifiers.find(modifier => modifier.kind === tsKind.ExportKeyword)) return;

    // Check if node export is at bundle level
    const check = node => {
        const text = source.text.substr(node.getStart(source), 40);
        return /\/\*(\s*)bundle(\s*)\*\//.test(text);
    };

    const output = [];

    const push = name => {
        if (output.includes(name)) return;
        output.push({name: name, from: name});
    };

    if (node.name) {
        if (!node.name.escapedText) return;
        check(node) && push(node.name.escapedText);
    }
    else if (node.declarationList && node.declarationList.declarations) {
        const {declarations} = node.declarationList;
        for (const declaration of declarations) {
            if (!declaration.name) continue;

            const name = declaration.name.escapedText;
            if (!name) continue;
            check(node) && push(name);
        }
    }

    return output;
};
