module.exports = function (dependencies, processors, imports, sourcemap) {
    'use strict';

    let code = '';

    // The imports that are required by the processors
    // (actually it is only used by jsx, that it requires react and react-dom)
    // Only for backward compatibility required by the dashboard
    processors.forEach(({imports}) => {
        if (!imports) return;
        const regexp = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)((?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

        imports.forEach(value => {
            value = value.replace(regexp, (str, resource) => {
                resource = resource.replace(/['|"]/g, '').trim();
                const split = str.split('from');
                if (split.length > 2) throw new Error(`Invalid import statement "${str}"`);

                const index = split.length === 1 ? 0 : 1;

                const url = dependencies.code.url(resource);
                split[index] = split[index].replace(resource, url);
                return split.join('from');
            });

            code += value + '\n'
        });
    });

    // The imports of the bundle (configured in the property .imports in the module.json)
    // Only for backward compatibility required by the dashboard
    imports.forEach(source => code += source.content + '\n');

    code = code.trim();
    if (code) sourcemap.concat(code);
}