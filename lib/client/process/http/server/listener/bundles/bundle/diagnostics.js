/**
 * Show diagnostics of a declaration or packager code
 *
 * @param packager {object} The packager
 * @param code {object} Can be the packager's code or declaration
 * @return {Promise<string>}
 */
module.exports = async function (packager, code) {
    let content = `<h1>Bundle diagnostics report</h1>`;

    const {length} = code.errors;
    content += `<h2>${length} ${length === 1 ? 'error' : 'errors'} found:</h2><ul>`;
    code.errors.forEach(error => content += `<li>${error}</li>`);
    content += '</ul>';

    const {processors} = packager;
    for (const processor of processors.values()) {
        const {name} = processor;
        if (['js', 'jsx'].includes(name)) {
            content += require('./legacy')(processor);
            continue;
        }

        await processor.compiler.ready;
        const {diagnostics} = processor.compiler;
        if (!diagnostics) continue;

        content += `<h2>Processor "${name}"</h2>`;
        if (diagnostics.valid) {
            content += 'No errors reported.';
        }
        else {
            if (diagnostics.general?.length) {
                diagnostics.general.forEach(error => content += `<li>${error}</li>`);
            }

            const processList = (name, list) => {
                if (!list || !list.size) return;

                content += `<h3>Errors found on ${list.size} ` +
                    `${list.size === 1 ? name.singular : name.plural}</h3>`;

                list.forEach((diagnostics, source) => {
                    if (!diagnostics) return;

                    content += `<h4>${source}</h4><ul>`;
                    diagnostics.forEach(diagnostic => {
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

    return `<html lang="en"><body>${content}</body></html>`;
}
