/**
 * Show diagnostics of a declaration or packager code
 *
 * @param packager {object} The packager
 * @param code {object} Can be the packager's js, css or declaration
 * @return {Promise<string>}
 */
module.exports = async function (packager, code) {
    const {valid} = code;
    const {bundle} = packager;
    const {container} = bundle;

    let content = '';
    content += '<h1>Bundle</h1>';
    content += container.container ? `<p><strong>Container package:</strong> ${container.container.package}</p>` : '';
    content += `<p><strong>Path:</strong> ${container.path}</p>`;
    content += `<p><strong>Resource:</strong> ${bundle.resource}</p>`;
    content += `<p><strong>Packager hash:</strong> ${packager.hash.value}</p>`;

    content += `<h1>Bundle diagnostics report</h1>`;

    const {length} = code.errors;
    content += `<h2>${length} ${length === 1 ? 'error' : 'errors'} found:</h2><ul>`;
    code.errors.forEach(error => content += `<li>${error}</li>`);
    content += '</ul>';

    const {processors} = packager;
    for (const processor of processors.values()) {
        const {packager} = processor;
        if (!packager) continue;

        const {compiler} = packager;
        if (!compiler) continue;
        await compiler.ready;

        const {name} = processor;
        content += `<h2>Processor "${name}"</h2>`;

        const {diagnostics} = compiler;
        if (diagnostics?.valid) {
            content += 'No errors reported.';
        }
        else if (diagnostics) {
            if (diagnostics.general?.length) {
                diagnostics.general.forEach(error => content += `<li>${error}</li>`);
            }

            const processList = (name, list) => {
                if (!list) return;
                const filtered = new Map([...list].filter(([, diagnostics]) => !!diagnostics));
                if (!filtered.size) return;

                content += `<h3>Errors found on ${filtered.size} ` +
                    `${filtered.size === 1 ? name.singular : name.plural}</h3>`;

                filtered.forEach((diagnostics, source) => {
                    content += `<h4>${source}</h4><ul>`;
                    diagnostics.forEach(diagnostic => {
                        diagnostic = typeof diagnostic === 'string' ? {message: diagnostic} : diagnostic;
                        const {line, character} = diagnostic;
                        const position = line && character ? `${line}:${character} - ` : '';
                        content += `<li>${position}${diagnostic.message}</li>`;
                    });
                    content += '</ul>';
                });
            };

            processList({singular: 'dependency', plural: 'dependencies'}, diagnostics.dependencies);
            processList({singular: 'file', plural: 'files'}, diagnostics.files);
            processList({singular: 'overwrite', plural: 'overwrites'}, diagnostics.overwrites);
            processList({singular: 'backend bridge', plural: 'backend bridges'}, diagnostics.bridges);
        }
    }

    return await require('../../info/html')(content, valid ? '200' : '500');
}
